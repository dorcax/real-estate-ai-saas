import { CreateBlockedTimeDto } from './dto/create-blocked-time.dto';
import { UpdateBlockedTimeDto } from './dto/update-blocked-time.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
export declare class BlockedTimeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createBlockedTime(dto: CreateBlockedTimeDto, currentUser: userEntity): Promise<{
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
    findOne(id: number): string;
    update(id: number, updateBlockedTimeDto: UpdateBlockedTimeDto): string;
    remove(id: number): string;
}
