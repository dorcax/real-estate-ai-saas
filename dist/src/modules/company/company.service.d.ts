import { CreateCompanyDto } from './dto/create-company.dto';
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
            phoneNumber: string;
            address: string | null;
            website: string | null;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            logoId: string;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
