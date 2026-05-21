import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    send(body: {
        user_id: number;
        message: string;
    }): Promise<import("./notification.entity").Notification>;
    getByUser(userId: string): Promise<import("./notification.entity").Notification[]>;
    markRead(id: string): Promise<import("./notification.entity").Notification>;
}
