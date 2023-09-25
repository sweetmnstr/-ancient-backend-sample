import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true, // Define it as the primary key
    autoIncrement: true, // Enable auto-increment for the id
  })
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column
  name: string;

  @Field(() => Float)
  @Column(DataType.FLOAT)
  balance: number;
}
