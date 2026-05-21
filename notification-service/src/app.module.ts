import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification/notification.entity';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notification_db',
      entities: [Notification],
      synchronize: true,
    }),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
