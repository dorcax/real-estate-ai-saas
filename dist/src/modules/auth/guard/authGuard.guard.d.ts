import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../services/prisma/prisma.service";
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly prismaService;
    constructor(jwtService: JwtService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private ExtractFromHeader;
}
