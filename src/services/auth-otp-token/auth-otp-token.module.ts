import { Global, Module } from '@nestjs/common';
import { AuthOtpTokenService } from './auth-otp-token.service';
import { AuthOtpTokenController } from './auth-otp-token.controller';
import  {PrismaService} from "src/services/prisma/prisma.service"

@Global()
@Module({
  controllers: [AuthOtpTokenController],
  providers: [AuthOtpTokenService, PrismaService],
  exports:[AuthOtpTokenService]
})
export class AuthOtpTokenModule {}
