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
exports.FlutterwaveService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let FlutterwaveService = class FlutterwaveService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async initiatePayment(dto) {
        const { tx_ref, amount, currency, email, name, redirect_url } = dto;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(await this.httpService.post('https://api.flutterwave.com/v3/payments', {
                tx_ref,
                amount,
                currency,
                customer: {
                    email,
                    name,
                },
                redirect_url,
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error(error.code);
            console.error(error.response.data);
            throw new common_1.InternalServerErrorException('Unable to initiate Flutterwave payment');
        }
    }
    findAll() {
        return `This action returns all flutterwave`;
    }
    findOne(id) {
        return `This action returns a #${id} flutterwave`;
    }
    update(id, updateFlutterwaveDto) {
        return `This action updates a #${id} flutterwave`;
    }
    remove(id) {
        return `This action removes a #${id} flutterwave`;
    }
};
exports.FlutterwaveService = FlutterwaveService;
exports.FlutterwaveService = FlutterwaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], FlutterwaveService);
//# sourceMappingURL=flutterwave.service.js.map