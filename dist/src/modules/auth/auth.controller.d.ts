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
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
    } | undefined>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
