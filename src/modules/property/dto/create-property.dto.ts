import { PropertyPurpose, PropertyStatus, PropertyType } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  

  @IsNotEmpty()
  @IsString()
  state: string;

  

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsArray()
  attachmentsId: string[];

  @IsArray()
  amenities: string[];

  @IsNotEmpty()
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsNotEmpty()
  @IsEnum(PropertyPurpose)
  propertyPurpose: PropertyPurpose;


  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  parkingSpace: number;

  @IsNumber()
  toilets?: number;

  @IsNumber()
  buildingSize?: number;

  @IsString()
  postalCode?: string;

  @IsBoolean()
  isFeatured?: boolean;
}