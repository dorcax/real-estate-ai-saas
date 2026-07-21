import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, ForgotPasswordDto, LoginUserDto, ResendOtpDto, ResetPasswordDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
   register( @Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  async login( @Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }


  @Post("forgot-password")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post("resend-otp")
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto);
  }

  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
