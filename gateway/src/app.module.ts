import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthResolver } from './resolvers/auth.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { IncidentResolver } from './resolvers/incident.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';
import { TrafficResolver } from './resolvers/traffic.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // generates schema automatically
      context: ({ req }) => ({ req }), // passes headers through
    }),
  ],
  controllers: [AppController],
  providers: [
    AuthResolver,
    VehicleResolver,
    TrafficResolver,
    IncidentResolver,
    NotificationResolver,
    AppService],
})
export class AppModule {}
