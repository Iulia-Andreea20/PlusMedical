/*
  Warnings:

  - You are about to drop the column `Status` on the `Documents` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "Status";

-- DropEnum
DROP TYPE "DocumentStatus";

-- CreateTable
CREATE TABLE "Requests" (
    "RequestId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "RequestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" "RequestStatus" NOT NULL,
    "RequestedAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("RequestId")
);

-- CreateTable
CREATE TABLE "Cards" (
    "CardId" SERIAL NOT NULL,
    "RequestId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "CardNumber" TEXT NOT NULL,
    "Signature" TEXT NOT NULL,
    "CurrentBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ApprovedAmount" DOUBLE PRECISION NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("CardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Requests_UserId_key" ON "Requests"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_RequestId_key" ON "Cards"("RequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_UserId_key" ON "Cards"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_CardNumber_key" ON "Cards"("CardNumber");

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_RequestId_fkey" FOREIGN KEY ("RequestId") REFERENCES "Requests"("RequestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
