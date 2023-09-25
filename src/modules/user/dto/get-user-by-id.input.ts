import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetUserByIdInput {
  @Field(() => Int, { description: 'User id' })
  id: number;
}
