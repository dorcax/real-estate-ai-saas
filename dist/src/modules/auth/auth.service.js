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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2 = __importStar(require("argon2"));
const auth_otp_token_service_1 = require("../../services/auth-otp-token/auth-otp-token.service");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    authOtpTokenService;
    constructor(prisma, jwtService, authOtpTokenService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.authOtpTokenService = authOtpTokenService;
    }
    async create(createAuthDto) {
        const { fullName, email, password } = createAuthDto;
        const existingUser = await this.findUser({ email });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                fullName,
                email,
                password: await argon2.hash(password),
            },
        });
        await this.authOtpTokenService.verificationOtpEmail({
            email: user.email,
            userId: user.id,
            name: user.fullName,
        });
        return {
            message: 'User is successfully created',
            fullName: user.fullName,
            email: user.email,
        };
    }
    async login(LoginDto) {
        const { email, password } = LoginDto;
        const existingUser = await this.findUser({ email });
        if (!existingUser) {
            throw new common_1.BadRequestException('invalid email or password ');
        }
        if (!existingUser.isVerified)
            throw new common_1.BadRequestException('User is not verified');
        const isPasswordValid = await argon2.verify(existingUser.password, password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('invalid email or password ');
        }
        const payload = {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'user logged in successfully',
            token,
        };
    }
    async forgotPassword(dto) {
        const { email } = dto;
        const user = await this.findUser({ email });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        await this.authOtpTokenService.sendForgotPasswordEmail({
            email: user.email,
            userId: user.id,
            name: user.fullName,
        });
    }
    async resendOtp(dto) {
        const { email } = dto;
        const user = await this.findUser({ email });
        if (!user)
            throw new common_1.BadRequestException('user not found ');
        if (user.isVerified)
            throw new common_1.ConflictException('User is already verified');
        const otp = await this.authOtpTokenService.findOtpByEmail(user.email);
        if (otp) {
            const secondsSinceCreation = (Date.now() - otp.createdAt.getTime()) / 1000;
            if (secondsSinceCreation < 60) {
                throw new common_1.BadRequestException('Please wait before requesting another OTP.');
            }
            const data = await this.authOtpTokenService.verificationOtpEmail({
                email: user.email,
                userId: user.id,
                name: user.fullName,
            });
            console.log("resending code", data);
            return {
                message: 'OTP resent successfully',
            };
        }
    }
    async resetPassword(dto) {
        const { email, password, code } = dto;
        const user = await this.findUser({ email });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const verifyOtp = await this.authOtpTokenService.verifyOtp({ email, code });
        if (!verifyOtp)
            throw new common_1.BadRequestException('Invalid OTP');
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: await argon2.hash(password),
            },
        });
        return {
            message: 'Password reset successfully',
        };
    }
    async findUser(where) {
        return this.prisma.user.findUnique({
            where,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        auth_otp_token_service_1.AuthOtpTokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map