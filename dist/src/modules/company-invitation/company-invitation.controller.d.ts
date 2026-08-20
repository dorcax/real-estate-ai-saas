import { CompanyInvitationService } from './company-invitation.service';
import { CompanyInvitationDto, CreateCompanyInvitation } from '../company-invitation/dto/create-companyInvitationDto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetInvitationQueryDto } from './dto/getQuery.dto';
export declare class CompanyInvitationController {
    private readonly companyInvitationService;
    constructor(companyInvitationService: CompanyInvitationService);
    create(createCompanyInvitationDto: CreateCompanyInvitation, currentUser: userEntity): Promise<{
        message: string;
        invitation: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            token: string;
            status: import("@prisma/client").$Enums.InvitationStatus;
            expiresAt: Date;
            acceptedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            invitedById: string;
            acceptedById: string | null;
        };
    }>;
    acceptCompanyInvitation(acceptCompanyInvitationDto: CompanyInvitationDto, currentUser: userEntity): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            isActive: boolean;
            fullName: string;
            password: string;
            phone: string | null;
            avatarUrl: string | null;
            isVerified: boolean;
        };
    }>;
    rejectCompanyInvitation(currentUser: userEntity, rejectCompanyInvitationDto: CompanyInvitationDto): Promise<{
        message: string;
    }>;
    getCompanyInvitation(query: GetInvitationQueryDto, currentUser: userEntity): Promise<{
        data: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            token: string;
            status: import("@prisma/client").$Enums.InvitationStatus;
            expiresAt: Date;
            acceptedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            invitedById: string;
            acceptedById: string | null;
        }[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
}
