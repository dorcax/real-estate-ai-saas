import { InvitationStatus } from "@prisma/client";
export declare class GetInvitationQueryDto {
    status?: InvitationStatus;
    page: number;
    limit: number;
}
