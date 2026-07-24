import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto, currentUser: userEntity): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: string): string;
}
