import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
   register(createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  async login(loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
