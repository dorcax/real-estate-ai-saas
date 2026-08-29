import { AppointmentStatus, AppointmentType } from '@prisma/client';
export declare class CreateAppointmentDto {
    title: string;
    type: AppointmentType;
    status: AppointmentStatus;
    description: string;
    notes: string;
    startAt: Date;
    endAt: Date;
    location: string;
    customerId: string;
    leadId: string;
    propertyId: string;
}
