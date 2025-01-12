import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from './graphql/graphql.module';
import { HealthController } from './modules/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }
    ),
    UserModule,
    GraphQLModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
