import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
import { CompanyInvitationDto, CreateCompanyInvitation } from '../company-invitation/dto/create-companyInvitationDto';
import { GetQueryDto } from './dto/getQuery.dto';
export declare class CompanyInvitationService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createCompanyInvitation(dto: CreateCompanyInvitation, currentUser: userEntity): Promise<{
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
    acceptCompanyInvitation(dto: CompanyInvitationDto, currentUser: userEntity): Promise<{
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
    rejectCompanyInvitationByAgent(dto: CompanyInvitationDto, currentUser: userEntity): Promise<{
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
    getCompanyInvitation(currentUser: userEntity, query: GetQueryDto): Promise<{
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
    getCompanyInvitationById(id: string, currentUser: userEntity): Promise<{
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
    }>;
    private generateToken;
    private getExpiryDate;
    private findInvitationByToken;
    private validateInvitationNotExpired;
}
