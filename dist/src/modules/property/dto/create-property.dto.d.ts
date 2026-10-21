import { PropertyPurpose, PropertyType } from "@prisma/client";
export declare class CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    state: string;
    city: string;
    attachmentsId: string[];
    amenities: string[];
    propertyType: PropertyType;
    propertyPurpose: PropertyPurpose;
    bedrooms: number;
    bathrooms: number;
    parkingSpace: number;
    toilets?: number;
    buildingSize?: number;
    postalCode?: string;
    isFeatured?: boolean;
}
