import { Role } from '@prisma/client';
export declare class CreateCompanyInvitation {
    email: string;
    role: Role;
}
export declare class CompanyInvitationDto {
    token: string;
}
