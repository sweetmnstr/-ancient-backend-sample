import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateBetInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Float)
  betAmount: number;

  @Field(() => Float)
  chance: number;
}
