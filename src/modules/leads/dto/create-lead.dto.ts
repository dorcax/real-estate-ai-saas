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
  @IsEnum(LeadTemperature)
  temperature: LeadTemperature;
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsOptional()
  customerId?: string;
  @IsNumber()
  @IsNotEmpty()
  budgetMinimum: number;
  @IsNumber()
  @IsNotEmpty()
  budgetMaximum: number;
  @IsNumber()
  @IsNotEmpty()
  currency: string;
  @IsString()
  @IsNotEmpty()
  preferredLocation: string;
  @IsString()
  @IsNotEmpty()
  preferredState: string;
  @IsEnum(PropertyType)
  preferredType: PropertyType;
  @IsEnum(PropertyPurpose)
  preferredPurpose: PropertyPurpose;
  @IsString()
  @IsNotEmpty()
  urgency: string;
  @IsString()
  @IsNotEmpty()
  notes: string;
}




export class AssignLeadDto {
  @IsString()
  @IsNotEmpty()
  agentId: string;
}