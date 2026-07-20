import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "../../services/prisma/prisma.service";
import { CreateAuthDto, ForgotPasswordDto, LoginUserDto } from './dto/create-auth.dto';
import { AuthOtpTokenService } from "../../services/auth-otp-token/auth-otp-token.service";
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
    private findUser;
}
