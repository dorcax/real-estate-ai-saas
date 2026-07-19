import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateAuthDto, LoginUserDto } from './dto/create-auth.dto';
import { AuthOtpTokenService } from 'src/services/auth-otp-token/auth-otp-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authOtpTokenService: AuthOtpTokenService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { fullName, email, password } = createAuthDto;
    // find if user exist
    const existingUser = await this.findUser({ email });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        password: await argon2.hash(password),
      },
    });
    // call the generate otp function
    await this.authOtpTokenService.create({
      email: user.email,
      userId: user.id,
    });

    return {
      message: 'User is successfully created',
      fullName: user.fullName,
      email: user.email,
    };
  }

  async login(LoginDto: LoginUserDto) {
    const { email, password } = LoginDto;
    // check if the email exist
    const existingUser = await this.findUser({ email });
    if (!existingUser) {
      throw new BadRequestException('invalid email or password ');
    }
    if (!existingUser.isVerified) throw new BadRequestException('User is not verified');
    // resend another code
    await this.authOtpTokenService.create({
      email: existingUser.email,
      userId: existingUser.id,
    });
    // verify if the password is correct
    const isPasswordValid = await argon2.verify(
      existingUser.password,
      password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('invalid email or password ');
    }

    // create a jwt session
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };
    const token = await this.jwtService.signAsync(payload);
  }

  //   forgot password
  // resend otp
  // reset password

  private async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
