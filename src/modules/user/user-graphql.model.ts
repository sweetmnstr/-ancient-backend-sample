import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class UserGraphql {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  balance: number;
}
