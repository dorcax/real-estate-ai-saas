import { PropertyStatus } from '@prisma/client';
export declare class GetQueryDto {
    status?: PropertyStatus;
    page: number;
    limit: number;
    search?: string;
}
