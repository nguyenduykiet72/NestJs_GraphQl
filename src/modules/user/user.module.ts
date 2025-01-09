import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { GraphQLModule } from 'src/graphql/graphql.module';
import { RegisterHandler } from './controllers/register.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule,
    JwtModule.register({
      secret: 'oursupersecretsupersecurekey1234567890',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, RegisterHandler],
  providers: [UserService],
})
export class UserModule {}
