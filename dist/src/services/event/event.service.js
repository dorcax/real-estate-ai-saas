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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const react_1 = __importDefault(require("react"));
const mail_service_1 = require("../mail/mail.service");
const event_entity_1 = require("./entities/event.entity");
const OtpEmail_1 = require("../mail/template/OtpEmail");
const ForgotPassword_1 = require("../mail/template/ForgotPassword");
let MailProcessor = class MailProcessor extends bullmq_1.WorkerHost {
    mailService;
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async process(job) {
        console.log("Processing email job...");
        console.log(job.data);
        switch (job.name) {
            case event_entity_1.MailJob.VERIFY_EMAIL:
                await this.mailService.sendEmail(job.data.email, "Verify Your Email", react_1.default.createElement(OtpEmail_1.OtpEmail, {
                    name: job.data.name,
                    code: job.data.code,
                    year: new Date().getFullYear(),
                }));
                break;
            case event_entity_1.MailJob.RESET_PASSWORD:
                await this.mailService.sendEmail(job.data.email, "Reset Your Password ", react_1.default.createElement(ForgotPassword_1.ForgotPasswordEmail, {
                    name: job.data.name,
                    code: job.data.code,
                    expiresAt: job.data.expiresAt,
                    year: new Date().getFullYear(),
                }));
                break;
        }
    }
};
exports.MailProcessor = MailProcessor;
exports.MailProcessor = MailProcessor = __decorate([
    (0, bullmq_1.Processor)("mail"),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailProcessor);
//# sourceMappingURL=event.service.js.map