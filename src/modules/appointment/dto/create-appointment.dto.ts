import { AppointmentStatus, AppointmentType } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsEnum(AppointmentType)
  type: AppointmentType;
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  notes: string;
  @IsDate()
  startAt: Date;
  @IsDate()
  endAt: Date;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsString()
  @IsNotEmpty()
  customerId: string;
  @IsString()
  @IsNotEmpty()
  leadId: string;
  @IsString()
  @IsNotEmpty()
  propertyId: string;
}
