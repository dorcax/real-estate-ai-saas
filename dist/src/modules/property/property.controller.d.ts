import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto, currentUser: userEntity): Promise<{
        message: string;
        property: {
            id: string;
            address: string;
            city: string | null;
            state: string;
            country: string;
            description: string;
            currency: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            attachmentsId: string | null;
            title: string;
            price: import("@prisma/client/runtime/client").Decimal;
            postalCode: string | null;
            latitude: import("@prisma/client/runtime/client").Decimal | null;
            longitude: import("@prisma/client/runtime/client").Decimal | null;
            propertyType: import("@prisma/client").$Enums.PropertyType;
            propertyPurpose: import("@prisma/client").$Enums.PropertyPurpose;
            propertyStatus: import("@prisma/client").$Enums.PropertyStatus;
            bedrooms: number | null;
            bathrooms: number | null;
            toilets: number | null;
            parkingSpace: number | null;
            landSize: number | null;
            buildingSize: number | null;
            yearBuilt: number | null;
            amenities: string[];
            isFeatured: boolean;
            publishedAt: Date | null;
            createdById: string;
        };
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: string): string;
}
