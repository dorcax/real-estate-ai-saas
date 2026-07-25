import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: string): string;
}
