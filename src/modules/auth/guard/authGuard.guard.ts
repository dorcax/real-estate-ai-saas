import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.ExtractFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // user
      const user = await this.prismaService.user.findUnique({
        where: {
          id: decode.id,
        },
        include: {
          company: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = {
        ...decode,
        companyId: user.company?.id,
      };

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Your session has expired. Please log in again.',
        );
      }

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException(
        'Invalid or expired authentication token.',
      );
    }
  }

  private ExtractFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      return authHeader.split(' ')[1];
    }
  }
}
