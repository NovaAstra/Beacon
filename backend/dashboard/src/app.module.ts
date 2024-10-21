import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, type ApolloFederationDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      typePaths: ['**/*.graphql'],
      driver: ApolloFederationDriver
    }),
  ]
})
export class AppModule { }
