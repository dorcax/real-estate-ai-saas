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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: string): Promise<{
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
