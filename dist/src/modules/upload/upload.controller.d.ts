import { UploadService } from './upload.service';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    create(file: Express.Multer.File, currentUser: userEntity, attachmentId: string): Promise<{
        message: string;
    }>;
}
