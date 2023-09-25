import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  public async getUserOrThrow(
    id: number,
    options?: Omit<FindOptions<User>, 'where'>,
  ): Promise<User> {
    const user = await this.userModel.findByPk(id, options);
    if (!user && !user?.id) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  public async updateBalance(
    id: number,
    balance,
    options?: Omit<FindOptions<User>, 'where'>,
  ): Promise<User> {
    const user = await this.userModel.findByPk(id, options);
    await user.update({ balance: balance }, options);
    return user;
  }

  public async getUserList(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
