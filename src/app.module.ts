import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { POSTGRES_CONFIG } from './modules/db/config';
import { UserModule } from './modules/user/user.module';
import { BetModule } from './modules/bet/bet.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    SequelizeModule.forRoot(POSTGRES_CONFIG),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    BetModule,
  ],
})
export class AppModule {}
