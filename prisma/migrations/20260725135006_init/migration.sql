/*
  Warnings:

  - You are about to drop the `PropertyImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[logoId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attachmentsId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attachmentsId` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PropertyImage" DROP CONSTRAINT "PropertyImage_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyImage" DROP CONSTRAINT "PropertyImage_propertyId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "attachmentsId" TEXT;

-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "attachmentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logoId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "attachmentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "attachmentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "attachmentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "attachmentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "attachmentsId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "PropertyImage";

-- DropEnum
DROP TYPE "leadStatus";

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "attachmentsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_logoId_key" ON "Company"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_attachmentsId_key" ON "Property"("attachmentsId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
