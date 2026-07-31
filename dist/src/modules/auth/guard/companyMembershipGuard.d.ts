import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CompanyMembershipGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
