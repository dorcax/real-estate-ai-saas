import { PropertyPurpose, PropertyStatus, PropertyType } from '@prisma/client';
export declare class CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    country: string;
    state: string;
    currency: string;
    city: string;
    attachmentsId: string[];
    amenities: string[];
    propertyType: PropertyType;
    propertyPurpose: PropertyPurpose;
    propertyStatus: PropertyStatus;
    bedrooms: number;
    bathrooms: number;
    parkingSpace: number;
}
