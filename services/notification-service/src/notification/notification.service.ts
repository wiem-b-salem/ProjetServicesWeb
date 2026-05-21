import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notifRepo: Repository<Notification>,
  ) {}

  async send(user_id: number, message: string) {
    const notif = this.notifRepo.create({ user_id, message });
    return this.notifRepo.save(notif);
  }

  async getByUser(user_id: number) {
    return this.notifRepo.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(id: number) {
    const notif = await this.notifRepo.findOne({ where: { id } });
    if (!notif) throw new NotFoundException('Notification not found');
    notif.is_read = true;
    return this.notifRepo.save(notif);
  }
}