import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class PropertyService {
    private readonly PrismaService;
    constructor(PrismaService: PrismaService);
    create(dto: CreatePropertyDto, currentUser: userEntity): Promise<{
        message: string;
        property: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            address: string;
            city: string | null;
            state: string;
            country: string;
            description: string;
            currency: string;
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
            attachmentsId: string | null;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: number): string;
}
