import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Express } from 'express';
import { handleUpload } from '../config/cloudinary.config';
import { userEntity } from '../auth/dto/create-auth.dto';
import { MediaType } from '@prisma/client';
@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(file: Express.Multer.File, currentUser: userEntity) {
    const uploadResult: any = await handleUpload(file.buffer)

    // Get the last upload order for this user
    const lastUpload = await this.prismaService.upload.findFirst({
      where: {
        uploadedById: currentUser.id,
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
        order: nextOrder,
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

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
