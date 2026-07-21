import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  CreateAuthDto,
  ForgotPasswordDto,
  LoginUserDto,
  ResendOtpDto,
  ResetPasswordDto,
} from './dto/create-auth.dto';
import { AuthOtpTokenService } from 'src/services/auth-otp-token/auth-otp-token.service';
import { MailJob } from 'src/services/event/entities/event.entity';
import { isAfter } from 'date-fns';

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
    await this.authOtpTokenService.verificationOtpEmail({
      email: user.email,
      userId: user.id,
      name: user.fullName,
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
    if (!existingUser.isVerified)
      throw new BadRequestException('User is not verified');

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
    return {
      message: 'user logged in successfully',
      token,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const { email } = dto;
    const user = await this.findUser({ email });
    if (!user) throw new BadRequestException('User not found');
    // send mail  link
    await this.authOtpTokenService.sendForgotPasswordEmail({
      email: user.email,
      userId: user.id,
      name: user.fullName,
    });
  }

  // resend otp
  async resendOtp(dto: ResendOtpDto) {
    const { email } = dto;
    const user = await this.findUser({ email });
    if (!user) throw new BadRequestException('user not found ');

    // check if email is already verified
    if (user.isVerified)
      throw new ConflictException('User is already verified');

    // check if the otp have not expired
    const otp = await this.authOtpTokenService.findOtpByEmail(user.email);

    if (otp) {
      const secondsSinceCreation =
        (Date.now() - otp.createdAt.getTime()) / 1000;

      if (secondsSinceCreation < 60) {
        throw new BadRequestException(
          'Please wait before requesting another OTP.',
        );
      }
   const data = await this.authOtpTokenService.verificationOtpEmail({
        email: user.email,
        userId: user.id,
        name: user.fullName,
      });

      console.log("resending code",data)

      return {
        message: 'OTP resent successfully',
      };
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { email, password, code } = dto;

    const user = await this.findUser({ email });
    if (!user) throw new BadRequestException('User not found');

    // call the verify otp
    const verifyOtp = await this.authOtpTokenService.verifyOtp({ email, code });
    if (!verifyOtp) throw new BadRequestException('Invalid OTP');

    // update the user password
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await argon2.hash(password),
      },
    });
    return {
      message: 'Password reset successfully',
    };
  }

  private async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
