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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInvitationController = void 0;
const common_1 = require("@nestjs/common");
const company_invitation_service_1 = require("./company-invitation.service");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const create_companyInvitationDto_1 = require("../company-invitation/dto/create-companyInvitationDto");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const getQuery_dto_1 = require("./dto/getQuery.dto");
let CompanyInvitationController = class CompanyInvitationController {
    companyInvitationService;
    constructor(companyInvitationService) {
        this.companyInvitationService = companyInvitationService;
    }
    create(createCompanyInvitationDto, currentUser) {
        return this.companyInvitationService.createCompanyInvitation(createCompanyInvitationDto, currentUser);
    }
    acceptCompanyInvitation(acceptCompanyInvitationDto, currentUser) {
        return this.companyInvitationService.acceptCompanyInvitation(acceptCompanyInvitationDto, currentUser);
    }
    rejectCompanyInvitation(currentUser, rejectCompanyInvitationDto) {
        return this.companyInvitationService.rejectCompanyInvitationByAgent(rejectCompanyInvitationDto, currentUser);
    }
    getCompanyInvitation(query, currentUser) {
        return this.companyInvitationService.getCompanyInvitation(currentUser, query);
    }
};
exports.CompanyInvitationController = CompanyInvitationController;
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER', 'ADMIN']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_companyInvitationDto_1.CreateCompanyInvitation,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CompanyInvitationController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(['AGENT']),
    (0, common_1.Patch)('accept-invitation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_companyInvitationDto_1.CompanyInvitationDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CompanyInvitationController.prototype, "acceptCompanyInvitation", null);
__decorate([
    (0, auth_decorator_1.Auth)(['AGENT']),
    (0, common_1.Patch)('reject-invititation'),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, create_companyInvitationDto_1.CompanyInvitationDto]),
    __metadata("design:returntype", void 0)
], CompanyInvitationController.prototype, "rejectCompanyInvitation", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN', 'OWNER']),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQuery_dto_1.GetInvitationQueryDto, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CompanyInvitationController.prototype, "getCompanyInvitation", null);
exports.CompanyInvitationController = CompanyInvitationController = __decorate([
    (0, common_1.Controller)('company-invitation'),
    __metadata("design:paramtypes", [company_invitation_service_1.CompanyInvitationService])
], CompanyInvitationController);
//# sourceMappingURL=company-invitation.controller.js.map