"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./services/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const auth_otp_token_module_1 = require("./services/auth-otp-token/auth-otp-token.module");
const mail_module_1 = require("./services/mail/mail.module");
const event_module_1 = require("./services/event/event.module");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("@nestjs/bullmq");
const company_module_1 = require("./modules/company/company.module");
const upload_module_1 = require("./modules/upload/upload.module");
const property_module_1 = require("./modules/property/property.module");
const company_invitation_module_1 = require("./modules/company-invitation/company-invitation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            bullmq_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    connection: {
                        host: config.get('REDIS_HOST'),
                        port: config.get('REDIS_PORT'),
                        username: config.get('REDIS_USERNAME'),
                        password: config.get('REDIS_PASSWORD'),
                        tls: {},
                    },
                }),
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            auth_otp_token_module_1.AuthOtpTokenModule,
            mail_module_1.MailModule,
            event_module_1.EventModule,
            company_module_1.CompanyModule,
            upload_module_1.UploadModule,
            property_module_1.PropertyModule,
            company_invitation_module_1.CompanyInvitationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map