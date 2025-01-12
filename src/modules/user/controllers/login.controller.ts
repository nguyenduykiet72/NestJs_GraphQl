import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';
import { compare } from 'bcrypt';

@Controller('actions')
export class LoginController {
  constructor(
    private readonly userGraphQLService: UserGraphQLService,
    private readonly jwtService: JwtService,
  ) {}

  private generateJWT(user: any): string {
    return this.jwtService.sign({
      sub: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id.toString(),
      },
    });
  }

  // @Post('login')
  // async login(@Body() body: any) {
  //   try {
  //     const input = body.input?.input || body;

  //     const foundUser = await this.userGraphQLService.getUserByEmail(
  //       input.email,
  //     );
  //     console.log('foundUser::::', foundUser);

  //     if (!foundUser) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }

  //     const isPasswordValid = await compare(input.password, foundUser.password);
  //     if (!isPasswordValid) {
  //       throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
  //     }

  //     const accessToken = this.generateJWT(foundUser);

  //     return {
  //       id: foundUser.id,
  //       name: foundUser.name,
  //       email: foundUser.email,
  //       accessToken,
  //     };
  //   } catch (error) {
  //     console.error('Error while logging in', error);
  //     throw error;
  //   }
  // }
}
