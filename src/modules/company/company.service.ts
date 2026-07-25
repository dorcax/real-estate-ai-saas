import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createCompanyDto: CreateCompanyDto, currentUser: userEntity) {
    const { name, description, address, email, phoneNumber, logoId } = createCompanyDto
    // check if company already exist  
    const existingCompany = await this.prismaService.company.findFirst({
      where: {
        OR: [
          { email },
          { name }
        ]
      }
    });

    if (existingCompany) {
      throw new ConflictException('Company with this email or name already exists');
    }

    const createCompany = await this.prismaService.company.create({
      data: {
        name,
        
        description,
        address,
        email,
        phoneNumber,
        logo: {
          connect: {
            id: logoId
          }

        },
        users: {
          connect: {
            id: currentUser.id
          }
        }

      }
    })
    return {
      message: "company corrected created ",
      data:createCompany
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
