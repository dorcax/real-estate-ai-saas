"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const cloudinary_config_1 = __importStar(require("../config/cloudinary.config"));
let UploadService = class UploadService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(file, currentUser, attachmentId) {
        const uploadResult = await (0, cloudinary_config_1.handleUpload)(file.buffer);
        const data = await this.prismaService.upload.create({
            data: {
                name: file.originalname,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                type: client_1.MediaType.IMAGE,
                order: 0,
                uploadedBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
        return {
            message: 'upload successfully created',
            id: data.id,
            url: data.url,
            publicId: data.publicId,
        };
    }
    async delete(id, currentUser) {
        const upload = await this.prismaService.upload.findFirst({
            where: {
                id,
                uploadedById: currentUser.id,
            },
        });
        if (!upload) {
            throw new common_1.NotFoundException('upload not found ');
        }
        await cloudinary_config_1.default.uploader.destroy(upload.publicId);
        await this.prismaService.upload.delete({
            where: {
                id: upload.id,
            },
        });
        return {
            message: 'upload successfully deleted',
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map