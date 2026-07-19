import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "../../services/prisma/prisma.service";
import { CreateAuthDto, LoginUserDto } from './dto/create-auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    login(LoginDto: LoginUserDto): Promise<void>;
    private findUser;
}
