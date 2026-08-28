import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlockedTimeDto {
  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsString()
  reason?: string;
}