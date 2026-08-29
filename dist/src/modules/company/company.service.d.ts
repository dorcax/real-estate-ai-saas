import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCompanyDto: CreateCompanyDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            phoneNumber: string | null;
            email: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string;
            website: string | null;
            description: string | null;
            timezone: string | null;
            currency: string | null;
            settings: import("@prisma/client/runtime/client").JsonValue | null;
            stripeCustomerId: string | null;
            logoId: string | null;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
