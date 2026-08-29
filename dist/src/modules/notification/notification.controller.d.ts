import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: string): string;
}
