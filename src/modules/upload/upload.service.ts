import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaType } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import cloudinary, { handleUpload } from '../config/cloudinary.config';
@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(file: Express.Multer.File, currentUser: userEntity,attachmentId?:string) {
    const uploadResult: any = await handleUpload(file.buffer);

    //  Get the last upload order for this user
    // const lastUpload = await this.prismaService.upload.findFirst({
    //   where: {
    //    attachmentsId:attachmentId
    //   },
    //   orderBy: {
    //     order: 'desc',
    //   },
    //   select: {
    //     order: true,
    //   },
    // });

    // const nextOrder = lastUpload ? lastUpload.order + 1 : 1;
    const data = await this.prismaService.upload.create({
      data: {
        name: file.originalname,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        type: MediaType.IMAGE,
        order:0,

        
        uploadedBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return {
      message: 'upload successfully created',
      id: data.id,
      url: data.url,
      publicId: data.publicId,
    };
  }

  // delete upload

  async delete(id: string, currentUser: userEntity) {
    const upload = await this.prismaService.upload.findFirst({
      where: {
        id,
        uploadedById: currentUser.id,
      },
    });
    if (!upload) {
      throw new NotFoundException('upload not found ');
    }

    await cloudinary.uploader.destroy(upload.publicId);

    await this.prismaService.upload.delete({
      where: {
        id: upload.id,
      },
    });

    return {
      message: 'upload successfully deleted',
    };
  }
}
