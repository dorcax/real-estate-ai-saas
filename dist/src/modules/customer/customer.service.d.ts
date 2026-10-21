import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
import { GetQueryDto } from '../property/dto/get-query.dto';
import { Prisma } from '@prisma/client';
export declare class CustomerService {
    private readonly PrismaService;
    constructor(PrismaService: PrismaService);
    create(dto: CreateCustomerDto, tx?: Prisma.TransactionClient): Promise<{
        message: string;
        data: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            fullName: string | null;
            phone: string;
        };
    }>;
    findAll(currentUser: userEntity, query: GetQueryDto): Promise<{
        data: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            fullName: string | null;
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
            leads: {
                status: import("@prisma/client").$Enums.LeadStatus;
                attachmentsId: string | null;
                id: string;
                currency: string;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                propertyId: string | null;
                customerId: string;
                intent: import("@prisma/client").$Enums.LeadIntent;
                budgetMinimum: Prisma.Decimal | null;
                budgetMaximum: Prisma.Decimal | null;
                preferredLocation: string | null;
                preferredType: import("@prisma/client").$Enums.PropertyType | null;
                preferredPurpose: import("@prisma/client").$Enums.PropertyPurpose | null;
                temperature: import("@prisma/client").$Enums.LeadTemperature;
                score: number;
                preferredCity: string | null;
                preferredState: string | null;
                preferredBedrooms: number | null;
                preferredBathrooms: number | null;
                financingReady: boolean | null;
                decisionMaker: boolean | null;
                urgency: string | null;
                notes: string | null;
                qualificationData: Prisma.JsonValue | null;
                lastContactedAt: Date | null;
                nextFollowUpAt: Date | null;
                assignedAgentId: string | null;
            }[];
            appointments: {
                status: import("@prisma/client").$Enums.AppointmentStatus;
                title: string;
                description: string | null;
                attachmentsId: string | null;
                id: string;
                timezone: string;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                type: import("@prisma/client").$Enums.AppointmentType;
                propertyId: string | null;
                agentId: string;
                cancelledAt: Date | null;
                customerId: string;
                notes: string | null;
                leadId: string | null;
                startAt: Date;
                endAt: Date;
                location: string | null;
                meetingLink: string | null;
                externalCalendarId: string | null;
                reminderSentAt: Date | null;
                cancellationReason: string | null;
            }[];
        } & {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            fullName: string | null;
            phone: string;
        };
    }>;
    update(id: string, dto: UpdateCustomerDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            fullName: string | null;
            phone: string;
        };
    }>;
    remove(id: string, currentUser: userEntity): Promise<{
        message: string;
    }>;
}
