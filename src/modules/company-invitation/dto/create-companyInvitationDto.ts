import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyInvitation {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsEnum(Role)
  role:Role
}

export class CompanyInvitationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
