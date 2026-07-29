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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
let AuthGuard = class AuthGuard {
    jwtService;
    prismaService;
    constructor(jwtService, prismaService) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.ExtractFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const decode = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: decode.id
                },
                include: {
                    company: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            request.user = decode;
            console.log("Request user set:", request.user);
        }
        catch (error) {
            throw error;
        }
        return true;
    }
    ExtractFromHeader(request) {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            return authHeader.split(" ")[1];
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=authGuard.guard.js.map