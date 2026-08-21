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
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const get_query_dto_1 = require("../property/dto/get-query.dto");
const create_property_dto_1 = require("./dto/create-property.dto");
const update_property_dto_1 = require("./dto/update-property.dto");
const property_service_1 = require("./property.service");
let PropertyController = class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    create(createPropertyDto, currentUser) {
        return this.propertyService.create(createPropertyDto, currentUser);
    }
    findAll(currentUser, query) {
        return this.propertyService.findAll(currentUser, query);
    }
    findOne(id, currentUser) {
        return this.propertyService.findOne(id, currentUser);
    }
    update(id, dto, currentUser) {
        return this.propertyService.update(id, dto, currentUser);
    }
    remove(id, currentUser) {
        return this.propertyService.remove(id, currentUser);
    }
    addAgentToProperty(currentUser, id, agentId) {
        return this.propertyService.addAgentToProperty(currentUser, id, agentId);
    }
    getAgent(currentUser, id) {
        return this.propertyService.getAgents(currentUser, id);
    }
    deleteAgent(currentUser, id, agentId) {
        return this.propertyService.getAgents(currentUser, id);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN', 'OWNER']),
    (0, common_1.Get)(),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, get_query_dto_1.GetQueryDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN', 'OWNER']),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN', 'OWNER']),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_dto_1.UpdatePropertyDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(['ADMIN', 'OWNER']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "remove", null);
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER']),
    (0, common_1.Post)(':id/agents'),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, String, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "addAgentToProperty", null);
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER']),
    (0, common_1.Get)(':id/agents'),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "getAgent", null);
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER']),
    (0, common_1.Delete)(':id/agents/:agentId'),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, String, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "deleteAgent", null);
exports.PropertyController = PropertyController = __decorate([
    (0, common_1.Controller)('property'),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map