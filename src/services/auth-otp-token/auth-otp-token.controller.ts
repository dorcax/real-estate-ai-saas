import {
  Body,
  Controller,
  Delete,
  Param,
  Post
} from '@nestjs/common';
import { AuthOtpTokenService } from './auth-otp-token.service';
import {
  CreateAuthOtpTokenDto,
  VerifyOtpDto,
} from './dto/create-auth-otp-token.dto';

@Controller('auth-otp-token')
export class AuthOtpTokenController {
  constructor(private readonly authOtpTokenService: AuthOtpTokenService) {}

  @Post()
  create(@Body() createAuthOtpTokenDto: CreateAuthOtpTokenDto) {
    return this.authOtpTokenService.create(createAuthOtpTokenDto);
  }

  @Post('verify')
  verify(@Body() dto: VerifyOtpDto) {
    return this.authOtpTokenService.verifyOtp(dto);
  }

  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.authOtpTokenService.deleteOtp(id);
  }
}
