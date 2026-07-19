import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { addMinutes, isAfter } from 'date-fns';
import { UserService } from 'src/modules/user/user.service';
import { generateOtp } from 'src/utils/generateOtp';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthOtpTokenDto, VerifyOtpDto } from './dto/create-auth-otp-token.dto';

@Injectable()
export class AuthOtpTokenService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createAuthOtpTokenDto: CreateAuthOtpTokenDto) {
    // check if the email exist
    const { email, userId } = createAuthOtpTokenDto;

    // create the otp code
    const otp = generateOtp();
    const hashedOtp = await argon2.hash(otp);
    const otpToken = await this.prisma.otp.create({
      data: {
        email: email,
        code: hashedOtp,
        expiresAt: addMinutes(new Date(), 5),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    // send otp to user
    return {
      message: 'OTP sent successfully',
    };
  }

  findCode(email: string) {
    return this.prisma.otp.findFirst({
      where: {
        email,
      },
    });
  }

  // verify the otp code

  async verifyOtp(verifyOtpDto:VerifyOtpDto) {
    const { email, code } = verifyOtpDto;
    // find the code
    const otp = await this.findCode(email);
    if (!otp) throw new BadRequestException('invalid otp');

    // checked if it have expired
    const isExpired = isAfter(new Date(), otp.expiresAt);
    if (isExpired) throw new BadRequestException('otp has expired');
    
    // verify the hashed code
    const isOtpValid = await argon2.verify(otp.code, code);
    if (!isOtpValid) throw new BadRequestException('invalid otp');
    // update the user status
    await this.prisma.user.update({
      where: {
      id: otp.userId,
      },
      data: {
        isVerified: true,
      },
    });
    await this.deleteOtp(otp.id);
    return 'OTP verified successfully';
  }

  deleteOtp(id: string) {
    return this.prisma.otp.delete({
      where: {
        id
      },
    });
  }
}