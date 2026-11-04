import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyService } from './property.service';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto, currentUser: userEntity): Promise<{
        message: string;
        property: {
            attachment: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            address: string;
            city: string | null;
            state: string;
            description: string;
            currency: string;
            attachmentsId: string | null;
            title: string;
            price: import("@prisma/client/runtime/client").Decimal;
            amenities: string[];
            propertyType: import("@prisma/client").$Enums.PropertyType;
            propertyPurpose: import("@prisma/client").$Enums.PropertyPurpose;
            bedrooms: number | null;
            bathrooms: number | null;
            parkingSpace: number | null;
            toilets: number | null;
            buildingSize: number | null;
            postalCode: string | null;
            isFeatured: boolean;
            latitude: import("@prisma/client/runtime/client").Decimal | null;
            longitude: import("@prisma/client/runtime/client").Decimal | null;
            propertyStatus: import("@prisma/client").$Enums.PropertyStatus;
            landSize: number | null;
            yearBuilt: number | null;
            publishedAt: Date | null;
            createdById: string;
        };
    }>;
    findAll(currentUser: userEntity, query: GetQueryDto): Promise<{
        data: ({
            attachment: {
                uploads: {
                    url: string;
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    companyId: string | null;
                    publicId: string;
                    type: import("@prisma/client").$Enums.MediaType;
                    order: number | null;
                    size: number | null;
                    uploadedById: string | null;
                    attachmentsId: string | null;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            address: string;
            city: string | null;
            state: string;
            description: string;
            currency: string;
            attachmentsId: string | null;
            title: string;
            price: import("@prisma/client/runtime/client").Decimal;
            amenities: string[];
            propertyType: import("@prisma/client").$Enums.PropertyType;
            propertyPurpose: import("@prisma/client").$Enums.PropertyPurpose;
            bedrooms: number | null;
            bathrooms: number | null;
            parkingSpace: number | null;
            toilets: number | null;
            buildingSize: number | null;
            postalCode: string | null;
            isFeatured: boolean;
            latitude: import("@prisma/client/runtime/client").Decimal | null;
            longitude: import("@prisma/client/runtime/client").Decimal | null;
            propertyStatus: import("@prisma/client").$Enums.PropertyStatus;
            landSize: number | null;
            yearBuilt: number | null;
            publishedAt: Date | null;
            createdById: string;
        })[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getPropertyStats(currentUser: userEntity): Promise<{
        total: number;
        rented: number;
        sold: number;
        pending: number;
    }>;
    findOne(id: string, currentUser: userEntity, source: 'dashboard' | 'marketplace'): Promise<{
        property: {
            attachment: {
                uploads: {
                    url: string;
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    companyId: string | null;
                    publicId: string;
                    type: import("@prisma/client").$Enums.MediaType;
                    order: number | null;
                    size: number | null;
                    uploadedById: string | null;
                    attachmentsId: string | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            address: string;
            city: string | null;
            state: string;
            description: string;
            currency: string;
            attachmentsId: string | null;
            title: string;
            price: import("@prisma/client/runtime/client").Decimal;
            amenities: string[];
            propertyType: import("@prisma/client").$Enums.PropertyType;
            propertyPurpose: import("@prisma/client").$Enums.PropertyPurpose;
            bedrooms: number | null;
            bathrooms: number | null;
            parkingSpace: number | null;
            toilets: number | null;
            buildingSize: number | null;
            postalCode: string | null;
            isFeatured: boolean;
            latitude: import("@prisma/client/runtime/client").Decimal | null;
            longitude: import("@prisma/client/runtime/client").Decimal | null;
            propertyStatus: import("@prisma/client").$Enums.PropertyStatus;
            landSize: number | null;
            yearBuilt: number | null;
            publishedAt: Date | null;
            createdById: string;
        };
    }>;
    getPropertyPerformanceStats(id: string, currentUser: userEntity): Promise<{
        views: number;
        enquiries: number;
        reservations: number;
        totalProperties: number;
        totalAmount: number | import("@prisma/client/runtime/client").Decimal;
    }>;
    update(id: string, dto: UpdatePropertyDto, currentUser: userEntity): Promise<void>;
    remove(id: string, currentUser: userEntity): Promise<{
        message: string;
    }>;
    addAgentToProperty(currentUser: userEntity, id: string, agentId: string): Promise<{
        id: string;
        createdById: string;
        propertyId: string;
        isPrimary: boolean;
        assignedAt: Date;
        removedAt: Date | null;
        agentId: string;
    }>;
    getAgent(currentUser: userEntity, id: string): Promise<{
        id: string;
        createdById: string;
        propertyId: string;
        isPrimary: boolean;
        assignedAt: Date;
        removedAt: Date | null;
        agentId: string;
    }[]>;
    deleteAgent(currentUser: userEntity, id: string, agentId: string): Promise<{
        id: string;
        createdById: string;
        propertyId: string;
        isPrimary: boolean;
        assignedAt: Date;
        removedAt: Date | null;
        agentId: string;
    }[]>;
}
