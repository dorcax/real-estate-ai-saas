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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const get_query_dto_1 = require("../property/dto/get-query.dto");
let AppointmentController = class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    create(createAppointmentDto, currentUser) {
        return this.appointmentService.create(createAppointmentDto, currentUser);
    }
    findAll(currentUser, query) {
        return this.appointmentService.findAll(currentUser, query);
    }
    findOne(id, currentUser) {
        return this.appointmentService.findOne(id, currentUser);
    }
    update(id, updateAppointmentDto, currentUser) {
        return this.appointmentService.update(id, updateAppointmentDto, currentUser);
    }
    remove(id, currentUser) {
        return this.appointmentService.remove(id, currentUser);
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, auth_decorator_1.Auth)(['AGENT']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, get_query_dto_1.GetQueryDto]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "remove", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('appointment'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map