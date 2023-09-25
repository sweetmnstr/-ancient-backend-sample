import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetBetByIdInput {
  @Field(() => Int, { description: 'Bet id' })
  id: number;
}
