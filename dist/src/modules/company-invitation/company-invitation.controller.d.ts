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
        };
    }>;
    getStats(currentUser: userEntity): Promise<{
        totalMember: number;
        totalAdmin: number;
        totalAgent: number;
        totalPendingInvitation: number;
    }>;
    getTeamMembers(currentUser: userEntity): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        isActive: boolean;
        fullName: string;
        avatarUrl: string;
        _count: {
            assignedLeads: number;
            propertyAssignments: number;
        };
    }[]>;
    getCompanyInvitation(query: GetQueryDto, currentUser: userEntity): Promise<{
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
