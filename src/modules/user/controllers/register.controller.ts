import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { Users } from 'src/generated/graphql';
import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';
import { RegisterUserDto } from '../dto/register.dto';

@Controller('actions')
export class RegisterHandler {
  constructor(
    private readonly userGraphQLService: UserGraphQLService,
    private readonly jwtService: JwtService,
  ) {}

  private generateJWT(user: Users): string {
    const payload = {
      sub: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id.toString(),
      },
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  @Post('/register')
  async register(@Body() body: { input: { input: RegisterUserDto } }) {
    try {
      const {
        input: { input },
      } = body;
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
      if (
        error.response?.errors?.[0]?.message.includes(
          'Error during registration',
        )
      ) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw error;
    }
  }
}
