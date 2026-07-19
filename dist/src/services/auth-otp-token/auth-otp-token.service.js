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
exports.AuthOtpTokenService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../modules/user/user.service");
const generateOtp_1 = require("../../utils/generateOtp");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
const argon2 = __importStar(require("argon2"));
let AuthOtpTokenService = class AuthOtpTokenService {
    userService;
    prisma;
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async create(createAuthOtpTokenDto) {
        const { email, userId } = createAuthOtpTokenDto;
        const otp = (0, generateOtp_1.generateOtp)();
        const hashedOtp = await argon2.hash(otp);
        const otpToken = await this.prisma.otp.create({
            data: {
                email: email,
                code: hashedOtp,
                expiresAt: (0, date_fns_1.addMinutes)(new Date(), 5),
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return otpToken;
    }
    findCode(code) {
        return this.prisma.otp.findUnique({
            where: {
                code
            }
        });
    }
    async verifyOtp(code) {
        const otp = await this.findCode(code);
        if (!otp)
            throw new common_1.BadRequestException("invalid otp ");
    }
    remove(id) {
        return `This action removes a #${id} authOtpToken`;
    }
};
exports.AuthOtpTokenService = AuthOtpTokenService;
exports.AuthOtpTokenService = AuthOtpTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService])
], AuthOtpTokenService);
//# sourceMappingURL=auth-otp-token.service.js.map