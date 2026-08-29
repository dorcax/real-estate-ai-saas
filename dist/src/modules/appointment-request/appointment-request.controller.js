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
exports.AppointmentRequestController = void 0;
const common_1 = require("@nestjs/common");
const appointment_request_service_1 = require("./appointment-request.service");
const create_appointment_request_dto_1 = require("./dto/create-appointment-request.dto");
let AppointmentRequestController = class AppointmentRequestController {
    appointmentRequestService;
    constructor(appointmentRequestService) {
        this.appointmentRequestService = appointmentRequestService;
    }
    create(createAppointmentRequestDto) {
        return this.appointmentRequestService.create(createAppointmentRequestDto);
    }
};
exports.AppointmentRequestController = AppointmentRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_request_dto_1.CreateAppointmentRequestDto]),
    __metadata("design:returntype", void 0)
], AppointmentRequestController.prototype, "create", null);
exports.AppointmentRequestController = AppointmentRequestController = __decorate([
    (0, common_1.Controller)('appointment-request'),
    __metadata("design:paramtypes", [appointment_request_service_1.AppointmentRequestService])
], AppointmentRequestController);
//# sourceMappingURL=appointment-request.controller.js.map