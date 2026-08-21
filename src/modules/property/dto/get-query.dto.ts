import { PropertyType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class GetQueryDto {

  @IsOptional()
  status?: PropertyType;


  @IsOptional()
  @Type(()=>Number)
  page:number = 1;


  @IsOptional()
  @Type(()=>Number)
  limit:number = 10;

}