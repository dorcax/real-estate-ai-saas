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
exports.BlockedTimeController = void 0;
const common_1 = require("@nestjs/common");
const blocked_time_service_1 = require("./blocked-time.service");
const create_blocked_time_dto_1 = require("./dto/create-blocked-time.dto");
const update_blocked_time_dto_1 = require("./dto/update-blocked-time.dto");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
let BlockedTimeController = class BlockedTimeController {
    blockedTimeService;
    constructor(blockedTimeService) {
        this.blockedTimeService = blockedTimeService;
    }
    create(createBlockedTimeDto, currentUser) {
        return this.blockedTimeService.createBlockedTime(createBlockedTimeDto, currentUser);
    }
    findAll() {
        return this.blockedTimeService.findAll();
    }
    findOne(id) {
        return this.blockedTimeService.findOne(+id);
    }
    update(id, updateBlockedTimeDto) {
        return this.blockedTimeService.update(+id, updateBlockedTimeDto);
    }
    remove(id) {
        return this.blockedTimeService.remove(+id);
    }
};
exports.BlockedTimeController = BlockedTimeController;
__decorate([
    (0, auth_decorator_1.Auth)(['AGENT']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blocked_time_dto_1.CreateBlockedTimeDto, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], BlockedTimeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlockedTimeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockedTimeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blocked_time_dto_1.UpdateBlockedTimeDto]),
    __metadata("design:returntype", void 0)
], BlockedTimeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockedTimeController.prototype, "remove", null);
exports.BlockedTimeController = BlockedTimeController = __decorate([
    (0, common_1.Controller)('blocked-time'),
    __metadata("design:paramtypes", [blocked_time_service_1.BlockedTimeService])
], BlockedTimeController);
//# sourceMappingURL=blocked-time.controller.js.map