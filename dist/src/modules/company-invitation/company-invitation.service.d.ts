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
    acceptCompanyInvitation(dto: CompanyInvitationDto, currentUser: userEntity): Promise<{
        message: string;
        user: {
            email: string;
            fullName: string;
            password: string;
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
    rejectCompanyInvitationByAgent(dto: CompanyInvitationDto, currentUser: userEntity): Promise<{
        message: string;
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
        };
    }>;
    getCompanyInvitation(currentUser: userEntity, query: GetQueryDto): Promise<{
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
    getCompanyInvitationById(id: string, currentUser: userEntity): Promise<{
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
    }>;
    private generateToken;
    private getExpiryDate;
    private findInvitationByToken;
    private validateInvitationNotExpired;
}
