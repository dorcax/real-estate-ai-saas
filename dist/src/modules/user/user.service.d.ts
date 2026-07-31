import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
import { Prisma } from '@prisma/client';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    login(LoginDto: LoginUserDto): Promise<void>;
    findUser(where: Prisma.UserWhereUniqueInput): Promise<{
        fullName: string;
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        isActive: boolean;
        companyId: string | null;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: string): Promise<{
        fullName: string;
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        isActive: boolean;
        companyId: string | null;
    }>;
}
