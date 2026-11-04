import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
export declare class AvailabilityService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createAvailability(dto: CreateAvailabilityDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            isActive: boolean;
            timezone: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAvailabilityDto: UpdateAvailabilityDto): string;
    remove(id: number): string;
}
