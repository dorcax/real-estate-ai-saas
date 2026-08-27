import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthOtpTokenModule } from './services/auth-otp-token/auth-otp-token.module';
import { MailModule } from './services/mail/mail.module';
import { EventModule } from './services/event/event.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { CompanyModule } from './modules/company/company.module';
import { UploadModule } from './modules/upload/upload.module';
import { PropertyModule } from './modules/property/property.module';
import { CompanyInvitationModule } from './modules/company-invitation/company-invitation.module';
import { CustomerModule } from './modules/customer/customer.module';
import { LeadsModule } from './modules/leads/leads.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          username: config.get<string>('REDIS_USERNAME'),
          password: config.get<string>('REDIS_PASSWORD'),
          tls: {},
        },
      }),
    }),
    UserModule,
    AuthModule,
    AuthOtpTokenModule,
    MailModule,
    EventModule,
    CompanyModule,
    UploadModule,
    PropertyModule,
    CompanyInvitationModule,
    CustomerModule,
    LeadsModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
