import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { GraphQLModule } from 'src/graphql/graphql.module';
import { RegisterHandler } from './controllers/register.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule,
    // JwtModule.register({
    //   // secret: "oursupersecretsupersecurekey1234567890",
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1h' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController, RegisterHandler, LoginController],
  providers: [UserService],
})
export class UserModule {}
