import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  role?:Role
}


export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}


export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;




  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsString()
  password: string;
}


export class ResendOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;


}

export class userEntity {
  id:string
  role :Role
  companyId:string
  email:string  
}