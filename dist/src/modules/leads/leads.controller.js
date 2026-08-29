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
exports.LeadController = void 0;
const common_1 = require("@nestjs/common");
const leads_service_1 = require("./leads.service");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const update_lead_dto_1 = require("./dto/update-lead.dto");
const update_lead_dto_2 = require("./dto/update-lead.dto");
const create_lead_dto_2 = require("./dto/create-lead.dto");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const get_query_dto_1 = require("../property/dto/get-query.dto");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
let LeadController = class LeadController {
    leadService;
    constructor(leadService) {
        this.leadService = leadService;
    }
    create(dto) {
        return this.leadService.create(dto);
    }
    findAll(currentUser, query) {
        return this.leadService.findAll(currentUser, query);
    }
    findOne(id, currentUser) {
        return this.leadService.findOne(id, currentUser);
    }
    update(id, dto, currentUser) {
        return this.leadService.update(id, dto, currentUser);
    }
    updateStatus(id, dto, currentUser) {
        return this.leadService.updateStatus(id, dto, currentUser);
    }
    assignAgent(id, dto, currentUser) {
        return this.leadService.assignAgent(id, dto, currentUser);
    }
    unassignAgent(id, currentUser) {
        return this.leadService.unassignAgent(id, currentUser);
    }
    remove(id, currentUser) {
        return this.leadService.remove(id, currentUser);
    }
};
exports.LeadController = LeadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, get_query_dto_1.GetQueryDto]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lead_dto_1.UpdateLeadDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lead_dto_2.UpdateLeadStatusDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "updateStatus", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Patch)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_lead_dto_2.AssignLeadDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "assignAgent", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Patch)(':id/unassign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "unassignAgent", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], LeadController.prototype, "remove", null);
exports.LeadController = LeadController = __decorate([
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [leads_service_1.LeadsService])
], LeadController);
//# sourceMappingURL=leads.controller.js.map