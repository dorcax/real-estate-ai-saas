import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyService {
    create(dto: CreatePropertyDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: number): string;
}
