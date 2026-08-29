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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const plan_service_1 = require("./plan.service");
const create_plan_dto_1 = require("./dto/create-plan.dto");
const update_plan_dto_1 = require("./dto/update-plan.dto");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    async create(dto) {
        return this.planService.create(dto);
    }
    async findAll() {
        return this.planService.findAll();
    }
    async findOne(id) {
        return this.planService.findOne(id);
    }
    async update(id, dto) {
        return this.planService.update(id, dto);
    }
    async remove(id) {
        return this.planService.deactivate(id);
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, auth_decorator_1.Auth)(['OWNER']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_plan_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "remove", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map