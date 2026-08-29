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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RescheduleAppointmentRequestDto = exports.RejectAppointmentRequestDto = exports.CreateAppointmentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateAppointmentRequestDto {
    fullName;
    email;
    phone;
    propertyId;
    appointmentType;
    requestedStartAt;
    requestedEndAt;
    message;
    timezone;
}
exports.CreateAppointmentRequestDto = CreateAppointmentRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('NG'),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "propertyId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.AppointmentType),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "appointmentType", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "requestedStartAt", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "requestedEndAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentRequestDto.prototype, "timezone", void 0);
class RejectAppointmentRequestDto {
    reason;
}
exports.RejectAppointmentRequestDto = RejectAppointmentRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectAppointmentRequestDto.prototype, "reason", void 0);
class RescheduleAppointmentRequestDto {
    requestedStartAt;
    requestedEndAt;
    message;
}
exports.RescheduleAppointmentRequestDto = RescheduleAppointmentRequestDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RescheduleAppointmentRequestDto.prototype, "requestedStartAt", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RescheduleAppointmentRequestDto.prototype, "requestedEndAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RescheduleAppointmentRequestDto.prototype, "message", void 0);
//# sourceMappingURL=create-appointment-request.dto.js.map