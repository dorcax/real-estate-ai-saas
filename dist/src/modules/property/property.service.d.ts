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
            companyId: string;
            description: string;
            address: string;
            attachmentsId: string;
            title: string;
            price: number;
            country: string;
            state: string;
            propertyType: import("@prisma/client").$Enums.PropertyType;
            propertyPurpose: import("@prisma/client").$Enums.PropertyPurpose;
            propertyStatus: import("@prisma/client").$Enums.PropertyStatus;
            bedrooms: number | null;
            bathrooms: number | null;
            parkingSpace: number;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePropertyDto: UpdatePropertyDto): string;
    remove(id: number): string;
}
