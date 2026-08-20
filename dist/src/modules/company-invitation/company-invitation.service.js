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
exports.CompanyInvitationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let CompanyInvitationService = class CompanyInvitationService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
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
        const invitation = await this.prismaService.companyInvitation.create({
            data: {
                email,
                token: this.generateToken(),
                expiresAt: this.getExpiryDate(),
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
        const invitation = await this.prismaService.companyInvitation.findUnique({
            where: {
                token,
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
            throw new common_1.NotFoundException('Invitation token not found ');
        }
        if (invitation.status !== client_1.InvitationStatus.PENDING) {
            throw new common_1.ConflictException(`This invitation is already ${invitation.status.toLowerCase()}`);
        }
        if (invitation.expiresAt <= new Date()) {
            await this.prismaService.companyInvitation.update({
                where: {
                    id: invitation.id
                },
                data: {
                    status: client_1.InvitationStatus.EXPIRED
                }
            });
            throw new common_1.GoneException('this invitation has  expired ');
        }
        if (invitation.email !== currentUser.email) {
            throw new common_1.ForbiddenException('you are not the owner of this invitation');
        }
        return await this.prismaService.$transaction(async (prisma) => {
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
            return {
                message: 'invitation accepted ',
                user: updateUser
            };
        });
    }
    async rejectCompanyInvitationByAgent(dto, currentUser) {
        const { token } = dto;
        const invitation = await this.findInvitationByToken(token);
        if (invitation.status !== client_1.InvitationStatus.PENDING) {
            throw new common_1.ConflictException(`This invitation has already been ${invitation.status}`);
        }
        await this.validateInvitationNotExpired(invitation);
        const declineInvitation = await this.prismaService.companyInvitation.update({
            where: {
                id: invitation.id,
            },
            data: {
                status: client_1.InvitationStatus.DECLINED,
                acceptedBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        return {
            message: "Invitation is declined successfully "
        };
    }
    async getCompanyInvitation(currentUser, query) {
        const { status, page, limit } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prismaService.companyInvitation.findMany({
                where: {
                    companyId: currentUser.companyId,
                    ...(status && {
                        status
                    })
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            this.prismaService.companyInvitation.count({
                where: {
                    companyId: currentUser.companyId,
                    ...(status && { status })
                }
            })
        ]);
        return {
            data,
            pagination: {
                skip,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        };
    }
    async getCompanyInvitationById(id, currentUser) {
        const invitation = await this.prismaService.companyInvitation.findFirst({
            where: {
                id,
                companyId: currentUser.companyId
            }
        });
        if (!invitation) {
            throw new common_1.NotFoundException('invitation not found');
        }
        return invitation;
    }
    generateToken() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    getExpiryDate() {
        return (0, date_fns_1.addMinutes)(Date.now(), 10);
    }
    async findInvitationByToken(token) {
        const invitation = await this.prismaService.companyInvitation.findUnique({
            where: {
                token: token.trim(),
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation token was not found');
        }
        return invitation;
    }
    async validateInvitationNotExpired(invitation) {
        if (invitation.expiresAt <= new Date()) {
            await this.prismaService.companyInvitation.update({
                where: {
                    id: invitation.id,
                },
                data: {
                    status: client_1.InvitationStatus.EXPIRED,
                },
            });
            throw new common_1.GoneException('This invitation have expired ');
        }
    }
};
exports.CompanyInvitationService = CompanyInvitationService;
exports.CompanyInvitationService = CompanyInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyInvitationService);
//# sourceMappingURL=company-invitation.service.js.map