import { IsString } from "class-validator";

export class CreateFlutterwaveDto {

 @IsString()
  tx_ref: string;
   @IsString()
  amount:number;
   @IsString()
  currency: string;
   @IsString()
  email: string;
   @IsString()
  name: string;
   @IsString()
  redirect_url: string;
}
