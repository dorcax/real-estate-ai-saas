"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let CompanyService = class CompanyService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCompanyDto, currentUser) {
        const { name, description, address, email, phoneNumber, logoId } = createCompanyDto;
        console.log('current user', currentUser);
        const existingCompany = await this.prismaService.company.findUnique({
            where: {
                email,
            },
        });
        if (existingCompany) {
            throw new common_1.ConflictException('Company with this email or name already exists');
        }
        const createCompany = await this.prismaService.company.create({
            data: {
                name,
                description,
                address,
                email,
                phoneNumber,
                ...(logoId && {
                    logo: {
                        connect: {
                            id: logoId,
                        },
                    },
                }),
                users: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        console.log('current userb', currentUser.companyId);
        console.log('current userb', currentUser.role);
        console.log('current userb', currentUser.id);
        return {
            message: 'company successfully created ',
            data: createCompany,
        };
    }
    findAll() {
        return `This action returns all company`;
    }
    findOne(id) {
        return `This action returns a #${id} company`;
    }
    update(id, updateCompanyDto) {
        return `This action updates a #${id} company`;
    }
    remove(id) {
        return `This action removes a #${id} company`;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map