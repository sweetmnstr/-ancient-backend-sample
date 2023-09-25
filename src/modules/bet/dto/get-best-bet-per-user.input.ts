import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetBestBetPerUserInput {
  @Field(() => Int, { description: 'Bets response Limit' })
  limit: number;
}
