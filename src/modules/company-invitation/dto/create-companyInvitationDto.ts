import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyInvitation {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class CompanyInvitationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
