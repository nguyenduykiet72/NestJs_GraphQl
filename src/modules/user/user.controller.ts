import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput, User } from 'src/graphql/types/user.types';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserInput): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Post('with-posts')
  async createUserWithPosts(
    @Body()
    data: {
      name: string;
      email: string;
      posts: Array<{
        title: string;
        content?: string;
        published?: boolean;
      }>;
    },
  ): Promise<User> {
    return this.userService.createUserWithPosts(data);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(Number(id));
  }
}
