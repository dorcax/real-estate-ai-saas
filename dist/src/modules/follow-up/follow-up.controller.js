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
exports.FollowUpController = void 0;
const common_1 = require("@nestjs/common");
const follow_up_service_1 = require("./follow-up.service");
const create_follow_up_dto_1 = require("./dto/create-follow-up.dto");
const update_follow_up_dto_1 = require("./dto/update-follow-up.dto");
let FollowUpController = class FollowUpController {
    followUpService;
    constructor(followUpService) {
        this.followUpService = followUpService;
    }
    create(createFollowUpDto) {
        return this.followUpService.create(createFollowUpDto);
    }
    findAll() {
        return this.followUpService.findAll();
    }
    findOne(id) {
        return this.followUpService.findOne(+id);
    }
    update(id, updateFollowUpDto) {
        return this.followUpService.update(+id, updateFollowUpDto);
    }
    remove(id) {
        return this.followUpService.remove(+id);
    }
};
exports.FollowUpController = FollowUpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_follow_up_dto_1.CreateFollowUpDto]),
    __metadata("design:returntype", void 0)
], FollowUpController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FollowUpController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FollowUpController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_follow_up_dto_1.UpdateFollowUpDto]),
    __metadata("design:returntype", void 0)
], FollowUpController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FollowUpController.prototype, "remove", null);
exports.FollowUpController = FollowUpController = __decorate([
    (0, common_1.Controller)('follow-up'),
    __metadata("design:paramtypes", [follow_up_service_1.FollowUpService])
], FollowUpController);
//# sourceMappingURL=follow-up.controller.js.map