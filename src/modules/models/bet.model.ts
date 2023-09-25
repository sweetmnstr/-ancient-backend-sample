import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Table
export class Bet extends Model<Bet> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true, // Define it as the primary key
    autoIncrement: true, // Enable auto-increment for the id
  })
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Field(() => Float)
  @Column(DataType.FLOAT)
  betAmount: number;

  @Field(() => Float)
  @Column(DataType.FLOAT)
  chance: number;

  @Field(() => Float)
  @Column(DataType.FLOAT)
  payout: number;

  @Field(() => Boolean)
  @Column(DataType.BOOLEAN)
  win: boolean;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;
}
