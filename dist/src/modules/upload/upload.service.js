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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const cloudinary_config_1 = require("../config/cloudinary.config");
const client_1 = require("@prisma/client");
let UploadService = class UploadService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(file, currentUser) {
        const uploadResult = await (0, cloudinary_config_1.handleUpload)(file.buffer);
        const lastUpload = await this.prismaService.upload.findFirst({
            where: {
                uploadedById: currentUser.id,
            },
            orderBy: {
                order: 'desc',
            },
            select: {
                order: true,
            },
        });
        const nextOrder = lastUpload ? lastUpload.order + 1 : 1;
        const data = await this.prismaService.upload.create({
            data: {
                name: file.originalname,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                type: client_1.MediaType.IMAGE,
                order: nextOrder,
                uploadedBy: {
                    connect: {
                        id: currentUser.id
                    }
                },
                company: {
                    connect: {
                        id: currentUser.companyId
                    }
                }
            }
        });
        return {
            message: 'upload successfully created'
        };
    }
    findAll() {
        return `This action returns all upload`;
    }
    findOne(id) {
        return `This action returns a #${id} upload`;
    }
    update(id, updateUploadDto) {
        return `This action updates a #${id} upload`;
    }
    remove(id) {
        return `This action removes a #${id} upload`;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map