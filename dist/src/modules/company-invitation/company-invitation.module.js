"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInvitationModule = void 0;
const common_1 = require("@nestjs/common");
const company_invitation_service_1 = require("./company-invitation.service");
const company_invitation_controller_1 = require("./company-invitation.controller");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let CompanyInvitationModule = class CompanyInvitationModule {
};
exports.CompanyInvitationModule = CompanyInvitationModule;
exports.CompanyInvitationModule = CompanyInvitationModule = __decorate([
    (0, common_1.Module)({
        controllers: [company_invitation_controller_1.CompanyInvitationController],
        providers: [company_invitation_service_1.CompanyInvitationService, prisma_service_1.PrismaService],
    })
], CompanyInvitationModule);
//# sourceMappingURL=company-invitation.module.js.map