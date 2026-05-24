import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './zone/zone.entity';
import { ZoneModule } from './zone/zone.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'urban_traffic_db',
        schema: 'traffic',
        entities: [Zone],
        synchronize: true,
      }),
    ZoneModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
