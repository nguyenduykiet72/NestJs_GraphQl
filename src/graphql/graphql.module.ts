import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';
import { UserGraphQLService } from './services/user.graphql.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GRAPHQL_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new GraphQLClient(configService.get('HASURA_ENDPOINT'), {
          headers: {
            'x-hasura-admin-secret': configService.get('HASURA_ADMIN_SECRET'),
          },
        });
      },
      inject: [ConfigService],
    },
    UserGraphQLService,
  ],
  exports: [UserGraphQLService],
})
export class GraphQLModule {}
