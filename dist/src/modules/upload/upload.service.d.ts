import { UpdateUploadDto } from './dto/update-upload.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class UploadService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(file: Express.Multer.File, currentUser: userEntity): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUploadDto: UpdateUploadDto): string;
    remove(id: number): string;
}
