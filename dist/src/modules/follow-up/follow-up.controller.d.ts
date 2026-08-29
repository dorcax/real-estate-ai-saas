import { FollowUpService } from './follow-up.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
export declare class FollowUpController {
    private readonly followUpService;
    constructor(followUpService: FollowUpService);
    create(createFollowUpDto: CreateFollowUpDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFollowUpDto: UpdateFollowUpDto): string;
    remove(id: string): string;
}
