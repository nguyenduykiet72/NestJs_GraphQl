import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserInput, User } from 'src/graphql/types/user.types';
import { Users, Users_Insert_Input } from 'src/generated/graphql';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Users_Insert_Input): Promise<Users> {
    return this.userService.createUser(userData);
  }

  @Post('register')
  async registerUser(@Body() userData: Users_Insert_Input): Promise<Users> {
    return this.userService.registerUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Users | null> {
    return this.userService.getUserById(Number(id));
  }
}
