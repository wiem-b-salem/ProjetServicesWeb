import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  send(@Body() body: { user_id: number; message: string }) {
    return this.notificationService.send(body.user_id, body.message);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.notificationService.getByUser(+userId);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }
}