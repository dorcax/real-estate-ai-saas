import { Injectable } from '@nestjs/common';
import { MediaType } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { handleUpload } from '../config/cloudinary.config';
@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(file: Express.Multer.File, currentUser: userEntity,attachmentId:string) {
    const uploadResult: any = await handleUpload(file.buffer)

    // Get the last upload order for this user
    const lastUpload = await this.prismaService.upload.findFirst({
      where: {
        attachmentsId:attachmentId
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const nextOrder = lastUpload ? lastUpload.order + 1 : 1;
    const data = await this.prismaService.upload.create({
      data: {
        name: file.originalname,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        type: MediaType.IMAGE,
        order:nextOrder,
        uploadedBy: {
          connect: {
            id: currentUser.id
          }
        },
        company:{
          connect:{
            id:currentUser.companyId
          }
        }
      }


    })
  
    return {
      message:'upload successfully created'
    }

  }

}
