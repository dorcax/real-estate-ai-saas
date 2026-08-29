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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const create_auth_dto_1 = require("../auth/dto/create-auth.dto");
const get_query_dto_1 = require("../property/dto/get-query.dto");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    create(dto) {
        return this.customerService.create(dto);
    }
    findAll(currentUser, query) {
        return this.customerService.findAll(currentUser, query);
    }
    findOne(id, currentUser) {
        return this.customerService.findOne(id, currentUser);
    }
    update(id, dto, currentUser) {
        return this.customerService.update(id, dto, currentUser);
    }
    remove(id, currentUser) {
        return this.customerService.remove(id, currentUser);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.userEntity, get_query_dto_1.GetQueryDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto,
        create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_auth_dto_1.userEntity]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "remove", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map