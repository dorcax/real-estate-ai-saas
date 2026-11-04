import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    create(createAvailabilityDto: CreateAvailabilityDto, currentUser: userEntity): Promise<{
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
    findOne(id: string): string;
    update(id: string, updateAvailabilityDto: UpdateAvailabilityDto): string;
    remove(id: string): string;
}
