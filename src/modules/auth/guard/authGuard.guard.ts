import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/services/prisma/prisma.service";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService,
        private readonly prismaService:PrismaService
    ){}

   async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token =request.ExtractFromHeader(request)

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const decode= await this.jwtService.verifyAsync(token,{
                secret:process.env.JWT_SECRET
            })
            // user 
            const user =await this.prismaService.user.findUnique({
                where:{
                    id:decode.id
                }
            })
            if(!user){
                throw new UnauthorizedException()
            }
        request.user =decode
        } catch (error) {
        throw new error
        }
        
         return true 
    }
   

   
    private ExtractFromHeader(request:Request):string | undefined {
        const authHeader =request.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer")){
            return authHeader.split(" ")[1]
        }

    }
}