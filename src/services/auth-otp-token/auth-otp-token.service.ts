import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { addMinutes, isAfter } from 'date-fns';
import { generateOtp } from 'src/utils/generateOtp';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthOtpTokenDto, VerifyOtpDto } from './dto/create-auth-otp-token.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ForgotPasswordDto } from 'src/modules/auth/dto/create-auth.dto';

@Injectable()
export class AuthOtpTokenService {
  constructor(
    @InjectQueue('mail')
    private readonly mailQueue: Queue,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async verificationOtpEmail(dto:CreateAuthOtpTokenDto) {
    const otpData=await this.generateAndStore(dto,5)

    await this.mailQueue.add("send-verification-email",{
      email: otpData.email,
      name: otpData.name,
      userId: otpData.userId,
      code: otpData.code
    })
   
    
    return {
      message: 'OTP sent successfully',
    };
  }
  

async sendForgotPasswordEmail(dto:CreateAuthOtpTokenDto) {
 const otpData =await this.generateAndStore(dto,10)
  await this.mailQueue.add("send-reset-password-email", {
    email: otpData.email,
    name: otpData.name,
    userId: otpData.userId,
    expiresAt: otpData.ExpiresInMinute,
    code: otpData.code
  });
}

  findOtpByEmail(email: string) {
    return this.prisma.otp.findFirst({
      where: {
        email,
      },
      orderBy:{
        createdAt:"desc"
      }
    });
  }

  // verify the otp code

  async verifyOtp(verifyOtpDto:VerifyOtpDto) {
    const { email, code } = verifyOtpDto;
    // find the code
    const otp = await this.findOtpByEmail(email);
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

  // generate otp
  private async generateAndStore(dto, ExpiresInMinute: number) {
    const { email, userId, name } = dto

    // delete existing otp 
    await this.prisma.otp.deleteMany({
      where:{
        email
      }
    })

    // create the otp code
    const otp = generateOtp();
    const hashedOtp = await argon2.hash(otp);
    const otpToken = await this.prisma.otp.create({
      data: {
        email: email,
      
        code: hashedOtp,
        expiresAt: addMinutes(new Date(), ExpiresInMinute),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return{
      email,
      name,
      userId,
      code: otp ,
      ExpiresInMinute
    };

  }
}