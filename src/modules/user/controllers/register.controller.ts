import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';
import { User } from 'src/graphql/types/user.types';

@Controller('actions')
export class RegisterHandler {
  constructor(
    private readonly userGraphQLService: UserGraphQLService,
    private readonly jwtService: JwtService,
  ) {}

  private generateJWT(user: User): string {
    const payload = {
      sub: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id.toString(),
      },
    };
    const token = this.jwtService.sign(payload);
    console.log('token:::', token);
    return token;
  }

  @Post('/register')
  async register(@Body() body: any) {
    try {
      const input = body.input?.input || body;
      if (!input?.password) {
        throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await hash(input.password, 10);

      const user = await this.userGraphQLService.registerUser({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      const accessToken = this.generateJWT(user);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
