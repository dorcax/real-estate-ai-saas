import { PropertyPurpose, PropertyStatus, PropertyType } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsArray()
  attachmentsId: string[];

  @IsNotEmpty()
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsNotEmpty()
  @IsEnum(PropertyPurpose)
  propertyPurpose: PropertyPurpose;

  @IsNotEmpty()
  @IsEnum(PropertyStatus)
  propertyStatus: PropertyStatus;

  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  parkingSpace: number;
}
