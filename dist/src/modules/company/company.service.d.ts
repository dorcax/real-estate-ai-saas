import { AcceptCompanyInvitationDto, CreateCompanyDto, CreateCompanyInvitation } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class CompanyService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCompanyDto: CreateCompanyDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            phoneNumber: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string;
            website: string | null;
            description: string | null;
            timezone: string | null;
            currency: string | null;
            isActive: boolean;
            settings: import("@prisma/client/runtime/client").JsonValue | null;
            stripeCustomerId: string | null;
            createdAt: Date;
            updatedAt: Date;
            logoId: string | null;
        };
    }>;
    createCompanyInvitation(dto: CreateCompanyInvitation, currentUser: userEntity): Promise<{
        message: string;
        invitation: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            role: import("@prisma/client").$Enums.Role;
            token: string;
            status: import("@prisma/client").$Enums.InvitationStatus;
            expiresAt: Date;
            acceptedAt: Date | null;
            invitedById: string;
            acceptedById: string | null;
        };
    }>;
    acceptCompanyInvitation(dto: AcceptCompanyInvitationDto, currentUser: userEntity): Promise<{
        message: string;
        result: void;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
