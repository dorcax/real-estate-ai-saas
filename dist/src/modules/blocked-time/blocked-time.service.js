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
exports.BlockedTimeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let BlockedTimeService = class BlockedTimeService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createBlockedTime(dto, currentUser) {
        const { startAt, endAt, reason } = dto;
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (start >= end) {
            throw new common_1.BadRequestException('Start time must be before end time');
        }
        const conflict = await this.prismaService.blockedTime.findFirst({
            where: {
                userId: currentUser.id,
                startAt: {
                    lt: end,
                },
                endAt: {
                    gt: start,
                },
            },
        });
        if (conflict) {
            throw new common_1.BadRequestException('This time is already blocked');
        }
        const blockedTime = await this.prismaService.blockedTime.create({
            data: {
                startAt: start,
                endAt: end,
                reason,
                company: {
                    connect: {
                        id: currentUser.companyId,
                    },
                },
                user: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        return {
            message: 'Blocked time created successfully',
            data: blockedTime,
        };
    }
    findAll() {
        return `This action returns all blockedTime`;
    }
    findOne(id) {
        return `This action returns a #${id} blockedTime`;
    }
    update(id, updateBlockedTimeDto) {
        return `This action updates a #${id} blockedTime`;
    }
    remove(id) {
        return `This action removes a #${id} blockedTime`;
    }
};
exports.BlockedTimeService = BlockedTimeService;
exports.BlockedTimeService = BlockedTimeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockedTimeService);
//# sourceMappingURL=blocked-time.service.js.map