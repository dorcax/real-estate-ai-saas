import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class UploadService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(file: Express.Multer.File, currentUser: userEntity, attachmentId?: string): Promise<{
        message: string;
        id: string;
        url: string;
        publicId: string;
    }>;
    delete(id: string, currentUser: userEntity): Promise<{
        message: string;
    }>;
}
