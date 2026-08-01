import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    address: string
    
    @IsNotEmpty()
    @IsString()
    logoId: string
}


