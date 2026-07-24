import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthOtpTokenDto, VerifyOtpDto } from './dto/create-auth-otp-token.dto';
import { Queue } from 'bullmq';
export declare class AuthOtpTokenService {
    private readonly mailQueue;
    private readonly prisma;
    private readonly mailService;
    constructor(mailQueue: Queue, prisma: PrismaService, mailService: MailService);
    verificationOtpEmail(dto: CreateAuthOtpTokenDto): Promise<{
        message: string;
    }>;
    sendForgotPasswordEmail(dto: CreateAuthOtpTokenDto): Promise<void>;
    findOtpByEmail(email: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        email: string;
        userId: string;
        code: string;
        id: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<string>;
    deleteOtp(id: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        email: string;
        userId: string;
        code: string;
        id: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    private generateAndStore;
}
