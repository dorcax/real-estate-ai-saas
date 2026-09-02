/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentsId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeInvoiceId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `maxAgents` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxAiAgents` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxCallMinutes` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxCalls` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flutterwaveTransactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flutterwaveReference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flutterwaveSubscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AppointmentRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'RESCHEDULE_REQUESTED', 'CANCELLED', 'EXPIRED');

-- AlterEnum
ALTER TYPE "SubscriptionStatus" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_attachmentsId_fkey";

-- DropIndex
DROP INDEX "Customer_createdById_key";

-- DropIndex
DROP INDEX "Payment_attachmentsId_key";

-- DropIndex
DROP INDEX "Payment_stripeInvoiceId_key";

-- DropIndex
DROP INDEX "Payment_stripePaymentIntentId_key";

-- DropIndex
DROP INDEX "Subscription_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdById",
DROP COLUMN "notes",
DROP COLUMN "source",
DROP COLUMN "state";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "attachmentsId",
DROP COLUMN "stripeInvoiceId",
DROP COLUMN "stripePaymentIntentId",
ADD COLUMN     "flutterwaveReference" TEXT,
ADD COLUMN     "flutterwaveTransactionId" TEXT,
ALTER COLUMN "currency" SET DEFAULT 'NGN';

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxAgents",
DROP COLUMN "maxAiAgents",
DROP COLUMN "maxCallMinutes",
DROP COLUMN "maxCalls";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "flutterwavePriceId" TEXT,
ADD COLUMN     "flutterwaveSubscriptionId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "AppointmentRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "type" "AppointmentType" NOT NULL,
    "status" "AppointmentRequestStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "notes" TEXT,
    "requestedStartAt" TIMESTAMP(3) NOT NULL,
    "requestedEndAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Lagos',
    "location" TEXT,
    "meetingLink" TEXT,
    "companyId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "leadId" TEXT,
    "propertyId" TEXT,
    "agentId" TEXT,
    "appointmentId" TEXT,
    "rejectionReason" TEXT,
    "cancellationReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentRequest_appointmentId_key" ON "AppointmentRequest"("appointmentId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_companyId_idx" ON "AppointmentRequest"("companyId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_companyId_status_idx" ON "AppointmentRequest"("companyId", "status");

-- CreateIndex
CREATE INDEX "AppointmentRequest_customerId_idx" ON "AppointmentRequest"("customerId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_leadId_idx" ON "AppointmentRequest"("leadId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_propertyId_idx" ON "AppointmentRequest"("propertyId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_agentId_idx" ON "AppointmentRequest"("agentId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_appointmentId_idx" ON "AppointmentRequest"("appointmentId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_requestedStartAt_idx" ON "AppointmentRequest"("requestedStartAt");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_code_key" ON "Otp"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_flutterwaveTransactionId_key" ON "Payment"("flutterwaveTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_flutterwaveReference_key" ON "Payment"("flutterwaveReference");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_flutterwaveSubscriptionId_key" ON "Subscription"("flutterwaveSubscriptionId");

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
