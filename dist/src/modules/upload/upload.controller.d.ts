import { UploadService } from './upload.service';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    create(file: Express.Multer.File, currentUser: userEntity): Promise<{
        message: string;
        id: string;
        url: string;
        publicId: string;
    }>;
    delete(id: string, currentUser: userEntity): Promise<{
        message: string;
    }>;
}
