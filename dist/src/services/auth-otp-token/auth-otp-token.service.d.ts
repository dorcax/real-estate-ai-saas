import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthOtpTokenDto, VerifyOtpDto } from './dto/create-auth-otp-token.dto';
import { MailService } from '../mail/mail.service';
import { Queue } from 'bullmq';
import { ForgotPasswordDto } from "../../modules/auth/dto/create-auth.dto";
export declare class AuthOtpTokenService {
    private readonly mailQueue;
    private readonly prisma;
    private readonly mailService;
    constructor(mailQueue: Queue, prisma: PrismaService, mailService: MailService);
    verificationOtpEmail(dto: CreateAuthOtpTokenDto): Promise<{
        message: string;
    }>;
    sendForgotPasswordEmail(dto: ForgotPasswordDto): Promise<void>;
    findCode(email: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<string>;
    deleteOtp(id: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    private generateAndStore;
}
