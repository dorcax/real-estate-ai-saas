import { AppointmentType } from '@prisma/client';
export declare class CreateAppointmentRequestDto {
    fullName: string;
    email: string;
    phone: string;
    propertyId: string;
    appointmentType: AppointmentType;
    requestedStartAt: string;
    requestedEndAt: string;
    message?: string;
    timezone?: string;
}
export declare class RejectAppointmentRequestDto {
    reason?: string;
}
export declare class RescheduleAppointmentRequestDto {
    requestedStartAt: string;
    requestedEndAt: string;
    message?: string;
}
