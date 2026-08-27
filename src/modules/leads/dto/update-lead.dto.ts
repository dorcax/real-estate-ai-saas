import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadDto } from './create-lead.dto';

import { IsEnum } from 'class-validator';
import { LeadStatus } from '@prisma/client';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}

export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus)
  status: LeadStatus;
}
