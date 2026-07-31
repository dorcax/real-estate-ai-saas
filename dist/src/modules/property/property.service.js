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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let PropertyService = class PropertyService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, currentUser) {
        const { title, description, price, address, country, state, currency, city, attachmentsId, amenities, propertyPurpose, propertyType, propertyStatus, bedrooms, parkingSpace, bathrooms, } = dto;
        const existingCompany = await this.PrismaService.company.findFirst({
            where: {
                id: currentUser.companyId,
            },
        });
        if (!existingCompany)
            throw new common_1.NotFoundException('company not found ');
        const property = await this.PrismaService.property.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                currency,
                city,
                state,
                propertyStatus,
                propertyType,
                propertyPurpose,
                bedrooms,
                bathrooms,
                amenities,
                parkingSpace,
                company: {
                    connect: {
                        id: existingCompany.id,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUser.id
                    }
                },
                ...(attachmentsId && {
                    attachment: {
                        create: {
                            uploads: {
                                connect: attachmentsId.map((id) => ({ id })),
                            },
                        },
                    },
                }),
            },
        });
        return {
            message: 'Property created successfully',
            property,
        };
    }
    findAll() {
        return `This action returns all property`;
    }
    findOne(id) {
        return `This action returns a #${id} property`;
    }
    update(id, updatePropertyDto) {
        return `This action updates a #${id} property`;
    }
    remove(id) {
        return `This action removes a #${id} property`;
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyService);
//# sourceMappingURL=property.service.js.map