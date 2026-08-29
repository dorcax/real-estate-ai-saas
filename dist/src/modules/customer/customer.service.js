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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let CustomerService = class CustomerService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, tx) {
        const { fullName, email, phone, companyId } = dto;
        const existingCustomer = await tx ?? this.PrismaService.customer.findUnique({
            where: {
                companyId_phone: {
                    companyId: companyId,
                    phone,
                },
            },
        });
        if (existingCustomer) {
            throw new common_1.BadRequestException('Customer with this phone number already exists');
        }
        const customer = await this.PrismaService.customer.create({
            data: {
                fullName,
                email,
                phone,
                company: {
                    connect: {
                        id: companyId,
                    },
                },
            },
        });
        return {
            message: 'customer created successfully',
            data: customer,
        };
    }
    async findAll(currentUser, query) {
        const { page, limit } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.PrismaService.customer.findMany({
                where: {
                    companyId: currentUser.companyId,
                },
                skip,
                take: limit,
            }),
            this.PrismaService.customer.count({
                where: {
                    companyId: currentUser.companyId,
                },
            }),
        ]);
        return {
            data,
            pagination: {
                skip,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, currentUser) {
        const customer = await this.PrismaService.customer.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
            include: {
                leads: true,
                appointments: true,
            },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return {
            message: 'Customer retrieved successfully',
            data: customer,
        };
    }
    async update(id, dto, currentUser) {
        const existingCustomer = await this.PrismaService.customer.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!existingCustomer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        if (dto.phone && dto.phone !== existingCustomer.phone) {
            const phoneExists = await this.PrismaService.customer.findUnique({
                where: {
                    companyId_phone: {
                        companyId: currentUser.companyId,
                        phone: dto.phone,
                    },
                },
            });
            if (phoneExists) {
                throw new common_1.BadRequestException('Customer with this phone number already exists');
            }
        }
        const customer = await this.PrismaService.customer.update({
            where: {
                id,
            },
            data: {
                ...dto,
            },
        });
        return {
            message: 'Customer updated successfully',
            data: customer,
        };
    }
    async remove(id, currentUser) {
        const existingCustomer = await this.PrismaService.customer.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!existingCustomer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        await this.PrismaService.customer.delete({
            where: {
                id,
            },
        });
        return {
            message: 'Customer deleted successfully',
        };
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map