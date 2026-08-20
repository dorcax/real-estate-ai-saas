import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
import { CompanyInvitationDto, CreateCompanyInvitation } from '../company-invitation/dto/create-companyInvitationDto';
import { GetInvitationQueryDto } from './dto/getQuery.dto';
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
    }>;
    getCompanyInvitation(currentUser: userEntity, query: GetInvitationQueryDto): Promise<{
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
