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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let AvailabilityService = class AvailabilityService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createAvailability(dto, currentUser) {
        const { dayOfWeek, startTime, endTime, timezone } = dto;
        if (startTime >= endTime) {
            throw new common_1.BadRequestException('Start time must be before end time');
        }
        const existing = await this.prismaService.availability.findUnique({
            where: {
                userId_dayOfWeek_startTime_endTime: {
                    userId: currentUser.id,
                    dayOfWeek,
                    startTime,
                    endTime,
                },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('This availability already exists');
        }
        const availability = await this.prismaService.availability.create({
            data: {
                dayOfWeek,
                startTime,
                endTime,
                timezone: timezone ?? 'Africa/Lagos',
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
            message: 'Availability created successfully',
            data: availability,
        };
    }
    findAll() {
        return `This action returns all availability`;
    }
    findOne(id) {
        return `This action returns a #${id} availability`;
    }
    update(id, updateAvailabilityDto) {
        return `This action updates a #${id} availability`;
    }
    remove(id) {
        return `This action removes a #${id} availability`;
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map