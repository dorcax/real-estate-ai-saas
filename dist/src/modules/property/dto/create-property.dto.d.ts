import { PropertyPurpose, PropertyStatus, PropertyType } from '@prisma/client';
export declare class CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    country: string;
    state: string;
    attachmentsId: string[];
    propertyType: PropertyType;
    propertyPurpose: PropertyPurpose;
    propertyStatus: PropertyStatus;
    bedrooms: number;
    bathrooms: number;
    parkingSpace: number;
}
