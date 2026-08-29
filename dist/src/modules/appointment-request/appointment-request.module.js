"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRequestModule = void 0;
const common_1 = require("@nestjs/common");
const appointment_request_service_1 = require("./appointment-request.service");
const appointment_request_controller_1 = require("./appointment-request.controller");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const customer_module_1 = require("../customer/customer.module");
const leads_module_1 = require("../leads/leads.module");
let AppointmentRequestModule = class AppointmentRequestModule {
};
exports.AppointmentRequestModule = AppointmentRequestModule;
exports.AppointmentRequestModule = AppointmentRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [customer_module_1.CustomerModule, leads_module_1.LeadsModule],
        controllers: [appointment_request_controller_1.AppointmentRequestController],
        providers: [appointment_request_service_1.AppointmentRequestService, prisma_service_1.PrismaService],
    })
], AppointmentRequestModule);
//# sourceMappingURL=appointment-request.module.js.map