import { JwtService } from '@nestjs/jwt';
import { AuthOtpTokenService } from "../../services/auth-otp-token/auth-otp-token.service";
import { PrismaService } from "../../services/prisma/prisma.service";
import { CreateAuthDto, ForgotPasswordDto, LoginUserDto, ResendOtpDto, ResetPasswordDto } from './dto/create-auth.dto';
import { Prisma } from '@prisma/client';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authOtpTokenService;
    constructor(prisma: PrismaService, jwtService: JwtService, authOtpTokenService: AuthOtpTokenService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    login(LoginDto: LoginUserDto): Promise<{
        message: string;
        token: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    findUser(where: Prisma.UserWhereUniqueInput): Promise<{
        company: {
            id: string;
        };
    } & {
        email: string;
        fullName: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        phone: string | null;
        avatarUrl: string | null;
        isVerified: boolean;
        isActive: boolean;
    }>;
    findUserById(userId: string): Promise<{
        company: {
            id: string;
        };
    } & {
        email: string;
        fullName: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        phone: string | null;
        avatarUrl: string | null;
        isVerified: boolean;
        isActive: boolean;
    }>;
}
