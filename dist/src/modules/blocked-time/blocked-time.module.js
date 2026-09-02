"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedTimeModule = void 0;
const common_1 = require("@nestjs/common");
const blocked_time_service_1 = require("./blocked-time.service");
const blocked_time_controller_1 = require("./blocked-time.controller");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let BlockedTimeModule = class BlockedTimeModule {
};
exports.BlockedTimeModule = BlockedTimeModule;
exports.BlockedTimeModule = BlockedTimeModule = __decorate([
    (0, common_1.Module)({
        controllers: [blocked_time_controller_1.BlockedTimeController],
        providers: [blocked_time_service_1.BlockedTimeService, prisma_service_1.PrismaService],
    })
], BlockedTimeModule);
//# sourceMappingURL=blocked-time.module.js.map