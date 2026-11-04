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
    getStats(currentUser: any): Promise<{
        totalActiveAgent: number;
        totalActiveLead: number;
        totalAppointment: number;
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
                status: import("@prisma/client").$Enums.AppointmentStatus;
                title: string;
                propertyId: string | null;
                agentId: string;
                cancelledAt: Date | null;
                notes: string | null;
                startAt: Date;
                endAt: Date;
                location: string | null;
                meetingLink: string | null;
                customerId: string;
                leadId: string | null;
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
                notes: string | null;
                customerId: string;
                intent: import("@prisma/client").$Enums.LeadIntent;
                temperature: import("@prisma/client").$Enums.LeadTemperature;
                score: number;
                budgetMinimum: Prisma.Decimal | null;
                budgetMaximum: Prisma.Decimal | null;
                preferredLocation: string | null;
                preferredCity: string | null;
                preferredState: string | null;
                preferredType: import("@prisma/client").$Enums.PropertyType | null;
                preferredPurpose: import("@prisma/client").$Enums.PropertyPurpose | null;
                preferredBedrooms: number | null;
                preferredBathrooms: number | null;
                financingReady: boolean | null;
                decisionMaker: boolean | null;
                urgency: string | null;
                qualificationData: Prisma.JsonValue | null;
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
