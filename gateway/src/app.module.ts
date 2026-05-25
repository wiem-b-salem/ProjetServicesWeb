import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthResolver } from './resolvers/auth.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { TrafficResolver } from './resolvers/traffic.resolver';
import { IncidentResolver } from './resolvers/incident.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '24h' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthResolver,
    VehicleResolver,
    TrafficResolver,
    IncidentResolver,
    NotificationResolver,
  ],
})
export class AppModule {}