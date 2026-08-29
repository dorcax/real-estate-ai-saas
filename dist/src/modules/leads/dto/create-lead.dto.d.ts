import { LeadIntent, LeadStatus, PropertyPurpose, PropertyType } from '@prisma/client';
export declare class CreateLeadDto {
    intent: LeadIntent;
    status: LeadStatus;
    customerId?: string;
    budgetMinimum?: number;
    budgetMaximum?: number;
    currency?: string;
    companyId: string;
    propertyId: string;
    preferredLocation?: string;
    preferredState?: string;
    preferredType: PropertyType;
    preferredPurpose: PropertyPurpose;
}
export declare class AssignLeadDto {
    agentId: string;
}
