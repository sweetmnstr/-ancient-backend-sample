import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bet } from '../../models/bet.model';
import { CreateBetInput } from '../dto/create-bet.input';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserService } from '../../user/user.service';

@Injectable()
export class CreateBetService {
  private t: Transaction;

  constructor(
    @InjectModel(Bet) private readonly betModel: typeof Bet,
    private readonly userService: UserService,
    private readonly sequelize: Sequelize,
  ) {}

  public async createBetInTransaction(createBetInput: CreateBetInput) {
    this.t = await this.sequelize.transaction();

    try {
      return this.createBet(createBetInput);
    } catch (error) {
      // Rollback the transaction in case of any errors
      await this.t.rollback();
      throw error;
    } finally {
      this.t = null;
    }
  }

  private async createBet({ userId, betAmount, chance }: CreateBetInput) {
    const t = this.t;
    const user = await this.userService.getUserOrThrow(userId, {
      transaction: t,
    });

    if (this.assertUserBalanceToBetAmount(user.balance, betAmount)) {
      throw new BadRequestException('Insufficient balance');
    }

    const isWin = this.calculateWin(chance);

    const payout = this.calculatePayout({ isWin, betAmount, chance });

    const newBalance = this.getUpdatedBalance({
      isWin,
      userBalance: user.balance,
      betAmount,
      payout,
    });

    const bet = await this.createBetInDB({
      win: isWin,
      chance,
      betAmount,
      payout,
      userId,
    }); // Update the user's balance in the database within the transaction
    await this.userService.updateBalance(
      userId,
      { balance: newBalance },
      { transaction: t },
    );

    // Commit the transaction if everything is successful
    await t.commit();

    return bet;
  }

  private assertUserBalanceToBetAmount(userBalance: number, betAmount: number) {
    return userBalance < betAmount;
  }

  private calculateWin(chance: number): boolean {
    return Math.random() < chance;
  }

  private calculatePayout({
    isWin,
    betAmount,
    chance,
  }: {
    isWin: boolean;
    betAmount: number;
    chance: number;
  }): number {
    return isWin ? betAmount * (1 / chance) : 0;
  }

  private getUpdatedBalance({
    isWin,
    userBalance,
    betAmount,
    payout,
  }: {
    isWin: boolean;
    userBalance: number;
    betAmount: number;
    payout: number;
  }) {
    return isWin ? userBalance + payout : userBalance - betAmount;
  }

  private async createBetInDB(rawBetModel: {
    userId: number;
    betAmount: number;
    chance: number;
    payout: number;
    win: boolean;
  }) {
    return this.betModel.create(rawBetModel, { transaction: this.t });
  }
}
