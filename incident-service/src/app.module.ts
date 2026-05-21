import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './incident/incident.entity';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'incident_db',
      entities: [Incident],
      synchronize: true,
    }),
    IncidentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
