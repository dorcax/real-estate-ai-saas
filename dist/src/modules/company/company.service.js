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
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
const client_1 = require("@prisma/client");
let CompanyService = class CompanyService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCompanyDto, currentUser) {
        const { name, description, address, email, phoneNumber, logoId } = createCompanyDto;
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
        return {
            message: 'company corrected created ',
            data: createCompany,
        };
    }
    async createCompanyInvitation(dto, currentUser) {
        const { email } = dto;
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('you must belong to a company before you can invite an agent ');
        }
        const existingInvitation = await this.prismaService.companyInvitation.findFirst({
            where: {
                email,
                status: client_1.InvitationStatus.PENDING,
                companyId: currentUser.companyId,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (existingInvitation) {
            throw new common_1.ConflictException('An active invitation has already been sent to this email');
        }
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const invitation = await this.prismaService.companyInvitation.create({
            data: {
                email,
                token,
                expiresAt: (0, date_fns_1.addMinutes)(Date.now(), 10),
                company: {
                    connect: {
                        id: currentUser.companyId,
                    },
                },
                invitedBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        return {
            message: 'invitation sent successfully',
            invitation,
        };
    }
    async acceptCompanyInvitation(dto, currentUser) {
        const { token } = dto;
        const invitation = await this.prismaService.companyInvitation.findFirst({
            where: {
                token,
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: {
                company: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation token not found or expired  ');
        }
        if (invitation.status !== client_1.InvitationStatus.PENDING) {
            throw new common_1.ConflictException(`This invitation is already ${invitation.status.toLowerCase()}`);
        }
        const result = await this.prismaService.$transaction(async (prisma) => {
            const updatedInvitation = await prisma.companyInvitation.update({
                where: {
                    id: invitation.id,
                },
                data: {
                    status: client_1.InvitationStatus.ACCEPTED,
                    acceptedBy: {
                        connect: {
                            id: currentUser.id,
                        },
                    },
                    acceptedAt: new Date(),
                },
            });
            const updateUser = await prisma.user.update({
                where: {
                    id: currentUser.id,
                },
                data: {
                    role: invitation.role,
                    company: {
                        connect: {
                            id: invitation.companyId,
                        },
                    },
                },
            });
        });
        return {
            message: 'invitation accepted ',
            result,
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