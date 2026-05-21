import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationService {
    private notifRepo;
    constructor(notifRepo: Repository<Notification>);
    send(user_id: number, message: string): Promise<Notification>;
    getByUser(user_id: number): Promise<Notification[]>;
    markAsRead(id: number): Promise<Notification>;
}
