import { AuthOtpTokenService } from './auth-otp-token.service';
import { CreateAuthOtpTokenDto, VerifyOtpDto } from './dto/create-auth-otp-token.dto';
export declare class AuthOtpTokenController {
    private readonly authOtpTokenService;
    constructor(authOtpTokenService: AuthOtpTokenService);
    create(createAuthOtpTokenDto: CreateAuthOtpTokenDto): Promise<{
        message: string;
    }>;
    verify(dto: VerifyOtpDto): Promise<string>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        email: string;
        userId: string;
        code: string;
        id: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
