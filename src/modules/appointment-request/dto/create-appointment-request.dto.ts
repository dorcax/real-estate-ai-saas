import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { AppointmentType } from '@prisma/client';

export class CreateAppointmentRequestDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phone: string;

  @IsUUID()
  propertyId: string;

  @IsEnum(AppointmentType)
  appointmentType: AppointmentType;

  @IsDateString()
  requestedStartAt: string;

  @IsDateString()
  requestedEndAt: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}


export class RejectAppointmentRequestDto {

  @IsOptional()
  @IsString()
  reason?: string;
}

export class RescheduleAppointmentRequestDto {

  @IsDateString()
  requestedStartAt: string;

  @IsDateString()
  requestedEndAt: string;

  @IsOptional()
  @IsString()
  message?: string;
}