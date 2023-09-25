import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { UserModule } from '../user/user.module';
import { CreateBetService } from './subservices/create-bet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bet } from '../models/bet.model';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([Bet])],
  providers: [BetResolver, BetService, CreateBetService],
})
export class BetModule {}
