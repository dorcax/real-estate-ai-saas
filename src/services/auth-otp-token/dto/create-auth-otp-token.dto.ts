import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthOtpTokenDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    userId:string
}



export class VerifyOtpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}
