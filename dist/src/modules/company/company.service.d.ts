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
            email: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phoneNumber: string;
            description: string;
            address: string | null;
            logoId: string;
            website: string | null;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
