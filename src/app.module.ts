import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthOtpTokenModule } from './services/auth-otp-token/auth-otp-token.module';


@Module({
  imports: [PrismaModule, UserModule, AuthModule, AuthOtpTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
