import { InvitationStatus } from "@prisma/client";
export declare class GetQueryDto {
    status?: InvitationStatus;
    page: number;
    limit: number;
}
