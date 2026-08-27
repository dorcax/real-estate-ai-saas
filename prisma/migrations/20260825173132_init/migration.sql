/*
  Warnings:

  - You are about to drop the column `aIAgentId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `aiAgentId` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the `AIAgent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Call` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CallMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KnowledgeDocument` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[createdById]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `PropertyAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CUSTOMER';

-- DropForeignKey
ALTER TABLE "AIAgent" DROP CONSTRAINT "AIAgent_companyId_fkey";

-- DropForeignKey
ALTER TABLE "AIAgent" DROP CONSTRAINT "AIAgent_phoneNumberId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_aIAgentId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_aiAgentId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_leadId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_phoneNumberId_fkey";

-- DropForeignKey
ALTER TABLE "CallMessage" DROP CONSTRAINT "CallMessage_callId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_aiAgentId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_callId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeDocument" DROP CONSTRAINT "KnowledgeDocument_aiAgentId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeDocument" DROP CONSTRAINT "KnowledgeDocument_attachmentsId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeDocument" DROP CONSTRAINT "KnowledgeDocument_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_aiAgentId_fkey";

-- DropIndex
DROP INDEX "Customer_userId_key";

-- DropIndex
DROP INDEX "Lead_aiAgentId_idx";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "aIAgentId";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "aiAgentId";

-- AlterTable
ALTER TABLE "PropertyAgent" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upload" ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- DropTable
DROP TABLE "AIAgent";

-- DropTable
DROP TABLE "Call";

-- DropTable
DROP TABLE "CallMessage";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "KnowledgeDocument";

-- DropEnum
DROP TYPE "AIAgentStatus";

-- DropEnum
DROP TYPE "AIAgentType";

-- DropEnum
DROP TYPE "CallDirection";

-- DropEnum
DROP TYPE "CallSpeaker";

-- DropEnum
DROP TYPE "CallStatus";

-- DropEnum
DROP TYPE "KnowledgeSourceType";

-- CreateTable
CREATE TABLE "CustomerInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "token" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expireAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "acceptedById" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInvitation_token_key" ON "CustomerInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_createdById_key" ON "Customer"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "User_companyId_key" ON "User"("companyId");

-- AddForeignKey
ALTER TABLE "CustomerInvitation" ADD CONSTRAINT "CustomerInvitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvitation" ADD CONSTRAINT "CustomerInvitation_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAgent" ADD CONSTRAINT "PropertyAgent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
