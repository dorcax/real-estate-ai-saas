import { AuthService } from './auth.service';
import { CreateAuthDto, ForgotPasswordDto, LoginUserDto, ResendOtpDto, ResetPasswordDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    login(loginDto: LoginUserDto): Promise<{
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
    getMe(req: any): Promise<{
        company: {
            id: string;
        };
    } & {
        id: string;
        fullName: string;
        email: string;
        password: string;
        phone: string | null;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
    }>;
}
