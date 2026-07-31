import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
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
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: string): string;
}
