import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class LoginUserDto{
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
