import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(dto: CreateCustomerDto): Promise<{
        message: string;
        data: {
            email: string | null;
            fullName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            phone: string;
        };
    }>;
    findAll(currentUser: userEntity, query: GetQueryDto): Promise<{
        data: {
            email: string | null;
            fullName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            phone: string;
        }[];
        pagination: {
            skip: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    findOne(id: string, currentUser: userEntity): Promise<{
        message: string;
        data: {
            appointments: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                description: string | null;
                timezone: string;
                type: import("@prisma/client").$Enums.AppointmentType;
                attachmentsId: string | null;
                title: string;
                status: import("@prisma/client").$Enums.AppointmentStatus;
                propertyId: string | null;
                agentId: string;
                cancelledAt: Date | null;
                customerId: string;
                notes: string | null;
                startAt: Date;
                endAt: Date;
                location: string | null;
                leadId: string | null;
                meetingLink: string | null;
                externalCalendarId: string | null;
                reminderSentAt: Date | null;
                cancellationReason: string | null;
            }[];
            leads: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                currency: string;
                attachmentsId: string | null;
                status: import("@prisma/client").$Enums.LeadStatus;
                propertyId: string | null;
                intent: import("@prisma/client").$Enums.LeadIntent;
                customerId: string;
                budgetMinimum: import("@prisma/client/runtime/client").Decimal | null;
                budgetMaximum: import("@prisma/client/runtime/client").Decimal | null;
                preferredLocation: string | null;
                preferredState: string | null;
                preferredType: import("@prisma/client").$Enums.PropertyType | null;
                preferredPurpose: import("@prisma/client").$Enums.PropertyPurpose | null;
                temperature: import("@prisma/client").$Enums.LeadTemperature;
                score: number;
                preferredCity: string | null;
                preferredBedrooms: number | null;
                preferredBathrooms: number | null;
                financingReady: boolean | null;
                decisionMaker: boolean | null;
                urgency: string | null;
                notes: string | null;
                qualificationData: import("@prisma/client/runtime/client").JsonValue | null;
                lastContactedAt: Date | null;
                nextFollowUpAt: Date | null;
                assignedAgentId: string | null;
            }[];
        } & {
            email: string | null;
            fullName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            phone: string;
        };
    }>;
    update(id: string, dto: UpdateCustomerDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            email: string | null;
            fullName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            phone: string;
        };
    }>;
    remove(id: string, currentUser: userEntity): Promise<{
        message: string;
    }>;
}
