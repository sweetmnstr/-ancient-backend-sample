import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';
import { GetBetByIdInput } from './dto/get-bet-by-id.input';
import { Bet } from '../models/bet.model';
import { GetBestBetPerUserInput } from './dto/get-best-bet-per-user.input';

@Resolver(() => Bet)
export class BetResolver {
  constructor(private readonly betService: BetService) {}

  @Mutation(() => Bet)
  public async createBet(
    @Args('createBetInput') createBetInput: CreateBetInput,
  ): Promise<Bet> {
    return this.betService.createBet(createBetInput);
  }

  @Query(() => [Bet])
  public async getBetList(): Promise<Bet[]> {
    return this.betService.getBetList();
  }

  @Query(() => [Bet])
  public async getBestBetPerUser(
    @Args('getBestBetPerUserInput') { limit }: GetBestBetPerUserInput,
  ): Promise<Bet[]> {
    return this.betService.getBestBetPerUser(limit);
  }

  @Query(() => Bet)
  public async getBet(
    @Args('getBetByIdInput') { id }: GetBetByIdInput,
  ): Promise<Bet> {
    return this.betService.getBet(id);
  }
}
