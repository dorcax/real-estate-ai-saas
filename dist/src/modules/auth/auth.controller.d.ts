import { AuthService } from './auth.service';
import { CreateAuthDto, LoginUserDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    login(loginDto: LoginUserDto): Promise<void>;
}
