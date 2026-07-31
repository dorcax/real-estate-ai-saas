import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthGuard } from '../guard/authGuard.guard';
import { RoleGuard } from '../guard/roleGuard';
import { Roles } from './roles.decorator';
import { CompanyMembershipGuard } from '../guard/companyMembershipGuard';

// Auth decorator with optional roles
export const Auth = (roles?: Role[], requireCompany?: false) => {
  // Only authentication if no roles provided
  if (!roles && !requireCompany) {
    return applyDecorators(UseGuards(AuthGuard));
  }

  if (requireCompany && roles.length === 0) {
    return applyDecorators(UseGuards(AuthGuard, CompanyMembershipGuard));
  }

  // Authentication and role checking
  if (!requireCompany && roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
  }
  // Authentication + role-based authorization
  return applyDecorators(
    Roles(...roles), // set roles metadata
    UseGuards(AuthGuard, RoleGuard), // execute guards
  );
};

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    // return data ? user?.[data]:user
    return user;
  },
);
