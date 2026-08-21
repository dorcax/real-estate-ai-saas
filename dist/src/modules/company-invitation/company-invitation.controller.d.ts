import { userEntity } from '../auth/dto/create-auth.dto';
import { CompanyInvitationDto, CreateCompanyInvitation } from '../company-invitation/dto/create-companyInvitationDto';
import { CompanyInvitationService } from './company-invitation.service';
import { GetQueryDto } from './dto/getQuery.dto';
export declare class CompanyInvitationController {
    private readonly companyInvitationService;
    constructor(companyInvitationService: CompanyInvitationService);
    create(createCompanyInvitationDto: CreateCompanyInvitation, currentUser: userEntity): Promise<{
        message: string;
        invitation: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            expiresAt: Date;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            status: import("@prisma/client").$Enums.InvitationStatus;
            token: string;
            invitedById: string;
            acceptedById: string | null;
            acceptedAt: Date | null;
        };
    }>;
    acceptCompanyInvitation(acceptCompanyInvitationDto: CompanyInvitationDto, currentUser: userEntity): Promise<{
        message: string;
        user: {
            fullName: string;
            password: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            phone: string | null;
            avatarUrl: string | null;
            isVerified: boolean;
            isActive: boolean;
        };
    }>;
    rejectCompanyInvitation(currentUser: userEntity, rejectCompanyInvitationDto: CompanyInvitationDto): Promise<{
        message: string;
    }>;
    getCompanyInvitation(query: GetQueryDto, currentUser: userEntity): Promise<{
        data: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            expiresAt: Date;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            status: import("@prisma/client").$Enums.InvitationStatus;
            token: string;
            invitedById: string;
            acceptedById: string | null;
            acceptedAt: Date | null;
        }[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
}
