import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './zone/zone.entity';
import { ZoneModule } from './zone/zone.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gesttrafic',
      entities: [Zone],
      synchronize: true,
    }),
    ZoneModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
