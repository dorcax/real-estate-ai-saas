// mail/jobs/mail-job.enum.ts

export enum MailJob {
  VERIFY_EMAIL = "send-verification-email",
  RESET_PASSWORD = "send-reset-password-email",
  WELCOME = "send-welcome-email",
  PROPERTY_APPROVED = "send-property-approved-email",
  BOOKING_CONFIRMATION = "send-booking-confirmation-email",
  PAYMENT_RECEIPT = "send-payment-receipt-email",
}