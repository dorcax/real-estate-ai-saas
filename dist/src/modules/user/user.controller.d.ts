import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        fullName: string;
        email: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): Promise<{
        fullName: string;
        password: string;
        email: string;
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
