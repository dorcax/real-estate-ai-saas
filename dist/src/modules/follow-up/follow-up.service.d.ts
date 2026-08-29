import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
export declare class FollowUpService {
    create(createFollowUpDto: CreateFollowUpDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFollowUpDto: UpdateFollowUpDto): string;
    remove(id: number): string;
}
