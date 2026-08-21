import { PropertyType } from "@prisma/client";
export declare class GetQueryDto {
    status?: PropertyType;
    page: number;
    limit: number;
}
