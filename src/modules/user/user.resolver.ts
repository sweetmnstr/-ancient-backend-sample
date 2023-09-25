import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { GetUserByIdInput } from './dto/get-user-by-id.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  public async getUser(
    @Args('getUserByIdInput') { id }: GetUserByIdInput,
  ): Promise<User> {
    return this.userService.getUserOrThrow(id);
  }

  @Query(() => [User])
  public async getUserList(): Promise<User[]> {
    return this.userService.getUserList();
  }
}
