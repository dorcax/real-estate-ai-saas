import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsNumber()
  @Min(0)
  monthlyPrice: number;

  @IsNumber()
  @Min(0)
  yearlyPrice: number;

  @IsInt()
  @Min(0)
  maxAgents: number;

  @IsInt()
  @Min(0)
  maxProperties: number;

  @IsInt()
  @Min(0)
  maxCalls: number;

  @IsInt()
  @Min(0)
  maxCallMinutes: number;

  @IsInt()
  @Min(0)
  maxAiAgents: number;

  @IsOptional()
  features?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}