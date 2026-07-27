import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsString()
    address: string


    @IsNotEmpty()
    @IsString()
    country:string

}

