/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockedTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyInvitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerInvitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowUpTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhoneNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyAgent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsageRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_agentId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_leadId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_actorId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlockedTime" DROP CONSTRAINT "BlockedTime_companyId_fkey";

-- DropForeignKey
ALTER TABLE "BlockedTime" DROP CONSTRAINT "BlockedTime_userId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_logoId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyInvitation" DROP CONSTRAINT "CompanyInvitation_acceptedById_fkey";

-- DropForeignKey
ALTER TABLE "CompanyInvitation" DROP CONSTRAINT "CompanyInvitation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyInvitation" DROP CONSTRAINT "CompanyInvitation_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_createdById_fkey";

-- DropForeignKey
ALTER TABLE "CustomerInvitation" DROP CONSTRAINT "CustomerInvitation_acceptedById_fkey";

-- DropForeignKey
ALTER TABLE "CustomerInvitation" DROP CONSTRAINT "CustomerInvitation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "FollowUpTask" DROP CONSTRAINT "FollowUpTask_assignedAgentId_fkey";

-- DropForeignKey
ALTER TABLE "FollowUpTask" DROP CONSTRAINT "FollowUpTask_companyId_fkey";

-- DropForeignKey
ALTER TABLE "FollowUpTask" DROP CONSTRAINT "FollowUpTask_createdById_fkey";

-- DropForeignKey
ALTER TABLE "FollowUpTask" DROP CONSTRAINT "FollowUpTask_leadId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_assignedAgentId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PropertyAgent" DROP CONSTRAINT "PropertyAgent_agentId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyAgent" DROP CONSTRAINT "PropertyAgent_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PropertyAgent" DROP CONSTRAINT "PropertyAgent_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "UsageRecord" DROP CONSTRAINT "UsageRecord_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UsageRecord" DROP CONSTRAINT "UsageRecord_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Attachments";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Availability";

-- DropTable
DROP TABLE "BlockedTime";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "CompanyInvitation";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "CustomerInvitation";

-- DropTable
DROP TABLE "FollowUpTask";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Otp";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "PhoneNumber";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "Property";

-- DropTable
DROP TABLE "PropertyAgent";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "Upload";

-- DropTable
DROP TABLE "UsageRecord";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "AppointmentType";

-- DropEnum
DROP TYPE "BillingInterval";

-- DropEnum
DROP TYPE "FollowUpStatus";

-- DropEnum
DROP TYPE "FollowUpType";

-- DropEnum
DROP TYPE "InvitationStatus";

-- DropEnum
DROP TYPE "LeadIntent";

-- DropEnum
DROP TYPE "LeadStatus";

-- DropEnum
DROP TYPE "LeadTemperature";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "NotificationChannel";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "PropertyPurpose";

-- DropEnum
DROP TYPE "PropertyStatus";

-- DropEnum
DROP TYPE "PropertyType";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SubscriptionStatus";

-- DropEnum
DROP TYPE "UsageType";
