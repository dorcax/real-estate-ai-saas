"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUpService = void 0;
const common_1 = require("@nestjs/common");
let FollowUpService = class FollowUpService {
    create(createFollowUpDto) {
        return 'This action adds a new followUp';
    }
    findAll() {
        return `This action returns all followUp`;
    }
    findOne(id) {
        return `This action returns a #${id} followUp`;
    }
    update(id, updateFollowUpDto) {
        return `This action updates a #${id} followUp`;
    }
    remove(id) {
        return `This action removes a #${id} followUp`;
    }
};
exports.FollowUpService = FollowUpService;
exports.FollowUpService = FollowUpService = __decorate([
    (0, common_1.Injectable)()
], FollowUpService);
//# sourceMappingURL=follow-up.service.js.map