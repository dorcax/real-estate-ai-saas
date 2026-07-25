import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadService } from './upload.service';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    create(file: Express.Multer.File, currentUser: userEntity): Promise<{
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUploadDto: UpdateUploadDto): string;
    remove(id: string): string;
}
