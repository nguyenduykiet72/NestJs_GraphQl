import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GraphQLModule } from 'src/graphql/graphql.module';

@Module({
  imports: [GraphQLModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
