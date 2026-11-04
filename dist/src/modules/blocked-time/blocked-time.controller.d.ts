import { BlockedTimeService } from './blocked-time.service';
import { CreateBlockedTimeDto } from './dto/create-blocked-time.dto';
import { UpdateBlockedTimeDto } from './dto/update-blocked-time.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class BlockedTimeController {
    private readonly blockedTimeService;
    constructor(blockedTimeService: BlockedTimeService);
    create(createBlockedTimeDto: CreateBlockedTimeDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            startAt: Date;
            endAt: Date;
            reason: string | null;
        };
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlockedTimeDto: UpdateBlockedTimeDto): string;
    remove(id: string): string;
}
