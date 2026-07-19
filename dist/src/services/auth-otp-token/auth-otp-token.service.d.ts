import { CreateAuthOtpTokenDto } from './dto/create-auth-otp-token.dto';
import { UserService } from "../../modules/user/user.service";
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthOtpTokenService {
    private readonly userService;
    private readonly prisma;
    constructor(userService: UserService, prisma: PrismaService);
    create(createAuthOtpTokenDto: CreateAuthOtpTokenDto): Promise<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findCode(code: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    verifyOtp(code: string): Promise<void>;
    remove(id: number): string;
}
