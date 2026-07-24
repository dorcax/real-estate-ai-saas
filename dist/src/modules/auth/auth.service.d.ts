import { JwtService } from '@nestjs/jwt';
import { AuthOtpTokenService } from "../../services/auth-otp-token/auth-otp-token.service";
import { PrismaService } from "../../services/prisma/prisma.service";
import { CreateAuthDto, ForgotPasswordDto, LoginUserDto, ResendOtpDto, ResetPasswordDto } from './dto/create-auth.dto';
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
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private findUser;
}
