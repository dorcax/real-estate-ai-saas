import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleUpload } from '../config/cloudinary.config';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { userEntity } from '../auth/dto/create-auth.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file:Express.Multer.File,@AuthUser() currentUser:userEntity) {
    return this.uploadService.create(file,currentUser);
  }

 
}
