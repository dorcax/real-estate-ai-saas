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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOtpTokenService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = __importStar(require("argon2"));
const date_fns_1 = require("date-fns");
const generateOtp_1 = require("../../utils/generateOtp");
const mail_service_1 = require("../mail/mail.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let AuthOtpTokenService = class AuthOtpTokenService {
    mailQueue;
    prisma;
    mailService;
    constructor(mailQueue, prisma, mailService) {
        this.mailQueue = mailQueue;
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async verificationOtpEmail(dto) {
        const otpData = await this.generateAndStore(dto, 5);
        await this.mailQueue.add("send-verification-email", {
            email: otpData.email,
            name: otpData.name,
            userId: otpData.userId,
            code: otpData.code
        });
        return {
            message: 'OTP sent successfully',
        };
    }
    async sendForgotPasswordEmail(dto) {
        const otpData = await this.generateAndStore(dto, 10);
        await this.mailQueue.add("send-reset-password-email", {
            email: otpData.email,
            name: otpData.name,
            userId: otpData.userId,
            expiresAt: otpData.ExpiresInMinute,
            code: otpData.code
        });
    }
    async findOtpByEmail(email) {
        const res = await this.prisma.otp.findFirst({
            where: {
                email,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log('find by email', res);
        return res;
    }
    async verifyOtp(verifyOtpDto) {
        const { email, code } = verifyOtpDto;
        const otp = await this.findOtpByEmail(email);
        if (!otp)
            throw new common_1.BadRequestException('invalid otp');
        const isExpired = (0, date_fns_1.isAfter)(new Date(), otp.expiresAt);
        if (isExpired)
            throw new common_1.BadRequestException('otp has expired');
        const isOtpValid = await argon2.verify(otp.code, code);
        console.log('isotpvalid', isOtpValid);
        if (!isOtpValid)
            throw new common_1.BadRequestException('invalid otp');
        await this.prisma.user.update({
            where: {
                id: otp.userId,
            },
            data: {
                isVerified: true,
            },
        });
        await this.deleteOtp(otp.id);
        return {
            message: "OTP verified successfully",
        };
    }
    deleteOtp(id) {
        return this.prisma.otp.delete({
            where: {
                id
            },
        });
    }
    async generateAndStore(dto, ExpiresInMinute) {
        const { email, userId, name } = dto;
        await this.prisma.otp.deleteMany({
            where: {
                email
            }
        });
        const otp = (0, generateOtp_1.generateOtp)();
        const hashedOtp = await argon2.hash(otp);
        const otpToken = await this.prisma.otp.create({
            data: {
                email: email,
                code: hashedOtp,
                expiresAt: (0, date_fns_1.addMinutes)(new Date(), ExpiresInMinute),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return {
            email,
            name,
            userId,
            code: otp,
            ExpiresInMinute,
        };
    }
};
exports.AuthOtpTokenService = AuthOtpTokenService;
exports.AuthOtpTokenService = AuthOtpTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('mail')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        prisma_service_1.PrismaService,
        mail_service_1.MailService])
], AuthOtpTokenService);
//# sourceMappingURL=auth-otp-token.service.js.map