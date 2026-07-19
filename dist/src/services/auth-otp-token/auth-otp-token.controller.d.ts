import { AuthOtpTokenService } from './auth-otp-token.service';
import { CreateAuthOtpTokenDto } from './dto/create-auth-otp-token.dto';
export declare class AuthOtpTokenController {
    private readonly authOtpTokenService;
    constructor(authOtpTokenService: AuthOtpTokenService);
    create(createAuthOtpTokenDto: CreateAuthOtpTokenDto): Promise<{
        id: string;
        email: string;
        code: string;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string): string;
}
