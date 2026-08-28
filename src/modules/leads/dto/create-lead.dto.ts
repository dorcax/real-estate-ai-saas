import {
  LeadIntent,
  LeadStatus,
  LeadTemperature,
  PropertyPurpose,
  PropertyType,
} from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLeadDto {
  @IsEnum(LeadIntent)
  intent: LeadIntent;
  @IsEnum(LeadStatus)
  status: LeadStatus;
 

  @IsNumber()
  @IsOptional()
  customerId?: string;
  @IsNumber()
  @IsOptional()
  budgetMinimum?: number;
  @IsNumber()
  @IsOptional()
  budgetMaximum?: number;
  @IsString()
  @IsOptional()
  currency?: string;
  @IsString()
  @IsNotEmpty()
  companyId: string;
  @IsString()
  @IsNotEmpty()
  propertyId: string;
  @IsString()
  @IsOptional()
  preferredLocation?: string;
  @IsString()
  @IsOptional()
  preferredState?: string;
  @IsEnum(PropertyType)
  preferredType: PropertyType;
  @IsEnum(PropertyPurpose)
  preferredPurpose: PropertyPurpose;
 
 
}




export class AssignLeadDto {
  @IsString()
  @IsNotEmpty()
  agentId: string;
}