import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password } = createUserDto;
    // find if user exist
    const existingUser = await this.findUser({ email });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        password: await argon2.hash(password),
      },
    });
    return {
      message: 'User is successfully created',
      fullName: user.fullName,
      email: user.email,
    };
  }


  async login(LoginDto: LoginUserDto) {
    const { email, password } = LoginDto;
    // check if the email exist
    const existingUser = await this.findUser({ email });
    if (!existingUser) {
      throw new BadRequestException('invalid email or password ');
    }
    // verify if the password is correct
    const isPasswordValid = await argon2.verify(existingUser.password, password);
    if (!isPasswordValid) {
      throw new BadRequestException('invalid email or password ');
    }
    // create a jwt session
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };
    const token =await this
    
  }


  public async findUser(where: Prisma.UserWhereUniqueInput) {
  return this.prisma.user.findUnique({
    where,
  });
}

  

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }


  async remove(id:string) {
    // remove user 

    return await this.prisma.user.delete({
      where:{
        id
        
      }
    })
  }
}
