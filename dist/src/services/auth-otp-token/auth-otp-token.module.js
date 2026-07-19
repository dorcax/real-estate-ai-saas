"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOtpTokenModule = void 0;
const common_1 = require("@nestjs/common");
const auth_otp_token_service_1 = require("./auth-otp-token.service");
const auth_otp_token_controller_1 = require("./auth-otp-token.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthOtpTokenModule = class AuthOtpTokenModule {
};
exports.AuthOtpTokenModule = AuthOtpTokenModule;
exports.AuthOtpTokenModule = AuthOtpTokenModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_otp_token_controller_1.AuthOtpTokenController],
        providers: [auth_otp_token_service_1.AuthOtpTokenService, prisma_service_1.PrismaService],
    })
], AuthOtpTokenModule);
//# sourceMappingURL=auth-otp-token.module.js.map