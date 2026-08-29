import { CreateLeadDto } from './create-lead.dto';
import { LeadStatus } from '@prisma/client';
declare const UpdateLeadDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLeadDto>>;
export declare class UpdateLeadDto extends UpdateLeadDto_base {
}
export declare class UpdateLeadStatusDto {
    status: LeadStatus;
}
export {};
