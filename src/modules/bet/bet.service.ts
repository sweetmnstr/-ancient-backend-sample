import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bet } from '../models/bet.model';
import { CreateBetInput } from './dto/create-bet.input';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { UserService } from '../user/user.service';
import { CreateBetService } from './subservices/create-bet.service';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(Bet) private readonly betModel: typeof Bet,
    private readonly createBetService: CreateBetService,
    private readonly sequelize: Sequelize,
  ) {}

  public async createBet(createBetInput: CreateBetInput): Promise<Bet> {
    return this.createBetService.createBetInTransaction(createBetInput);
  }

  async getBestBetPerUser(limit: number): Promise<Bet[]> {
    const sqlQuery = `
      SELECT b.*
      FROM (
        SELECT "userId", MAX(payout) AS maxPayout
        FROM "Bets"
        GROUP BY "userId"
      ) AS maxPayouts
      JOIN "Bets" AS b
      ON maxPayouts."userId" = b."userId" AND maxPayouts.maxPayout = b.payout
      LIMIT :limit
    `;

    // Execute the raw SQL query with replacements
    const results = await this.sequelize.query(sqlQuery, {
      replacements: { limit },
      type: QueryTypes.SELECT,
    });

    // Convert the raw results to Bet instances
    const bestBets = this.betModel.bulkBuild(results);

    return bestBets;
  }

  public async getBetList() {
    return this.betModel.findAll();
  }

  public async getBet(id: number) {
    return this.betModel.findByPk(id);
  }
}
