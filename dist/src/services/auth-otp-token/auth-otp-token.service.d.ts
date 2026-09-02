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
    findOtpByEmail(email: string): Promise<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        usedAt: Date | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    deleteOtp(id: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        usedAt: Date | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    private generateAndStore;
}
