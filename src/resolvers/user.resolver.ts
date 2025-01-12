import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Users, Users_Insert_Input } from 'src/generated/graphql';
import { UserService } from 'src/modules/user/services/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('users')
  async getAllUsers(): Promise<Users[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => ({
      ...user,
      posts: user.posts || [],
    }));
  }

  @Query('users_by_pk')
  async getUserById(@Args('id') id: number): Promise<Users | null> {
    return this.userService.getUserById(id);
  }

  @Mutation('insert_users_one')
  async createUser(
    @Args('object') createUserInput: Users_Insert_Input,
  ): Promise<Users> {
    return this.userService.createUser(createUserInput);
  }
}
