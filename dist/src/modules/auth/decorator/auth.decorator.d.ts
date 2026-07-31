import { Role } from '@prisma/client';
export declare const Auth: (roles?: Role[], requireCompany?: false) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
