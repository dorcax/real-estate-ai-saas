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
exports.AssignLeadDto = exports.CreateLeadDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateLeadDto {
    intent;
    status;
    customerId;
    budgetMinimum;
    budgetMaximum;
    currency;
    companyId;
    propertyId;
    preferredLocation;
    preferredState;
    preferredType;
    preferredPurpose;
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.LeadIntent),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "intent", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.LeadStatus),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "budgetMinimum", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "budgetMaximum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "propertyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "preferredLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "preferredState", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "preferredType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyPurpose),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "preferredPurpose", void 0);
class AssignLeadDto {
    agentId;
}
exports.AssignLeadDto = AssignLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignLeadDto.prototype, "agentId", void 0);
//# sourceMappingURL=create-lead.dto.js.map