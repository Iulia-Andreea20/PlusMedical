/*
  Warnings:

  - A unique constraint covering the columns `[CNP]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CNP` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "CNP" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BeneficiaryCoSigners" (
    "id" SERIAL NOT NULL,
    "BeneficiaryId" INTEGER NOT NULL,
    "CoSignerId" INTEGER NOT NULL,

    CONSTRAINT "BeneficiaryCoSigners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "CountryId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("CountryId")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "ProvinceId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CountryId" INTEGER NOT NULL,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("ProvinceId")
);

-- CreateTable
CREATE TABLE "Localities" (
    "LocalityId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "ProvinceId" INTEGER NOT NULL,

    CONSTRAINT "Localities_pkey" PRIMARY KEY ("LocalityId")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "AddressId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "LocalityId" INTEGER NOT NULL,
    "Street" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "Block" TEXT,
    "Staircase" TEXT,
    "Apartment" TEXT,
    "Province" TEXT,
    "Country" TEXT,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("AddressId")
);

-- CreateTable
CREATE TABLE "DocumentTypes" (
    "DocumentTypeId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "DocumentTypes_pkey" PRIMARY KEY ("DocumentTypeId")
);

-- CreateTable
CREATE TABLE "Documents" (
    "DocumentId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "DocumentTypeId" INTEGER NOT NULL,
    "UploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("DocumentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BeneficiaryCoSigners_BeneficiaryId_key" ON "BeneficiaryCoSigners"("BeneficiaryId");

-- CreateIndex
CREATE UNIQUE INDEX "BeneficiaryCoSigners_CoSignerId_key" ON "BeneficiaryCoSigners"("CoSignerId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_CNP_key" ON "Users"("CNP");

-- AddForeignKey
ALTER TABLE "BeneficiaryCoSigners" ADD CONSTRAINT "BeneficiaryCoSigners_BeneficiaryId_fkey" FOREIGN KEY ("BeneficiaryId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeneficiaryCoSigners" ADD CONSTRAINT "BeneficiaryCoSigners_CoSignerId_fkey" FOREIGN KEY ("CoSignerId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provinces" ADD CONSTRAINT "Provinces_CountryId_fkey" FOREIGN KEY ("CountryId") REFERENCES "Countries"("CountryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localities" ADD CONSTRAINT "Localities_ProvinceId_fkey" FOREIGN KEY ("ProvinceId") REFERENCES "Provinces"("ProvinceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_LocalityId_fkey" FOREIGN KEY ("LocalityId") REFERENCES "Localities"("LocalityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_DocumentTypeId_fkey" FOREIGN KEY ("DocumentTypeId") REFERENCES "DocumentTypes"("DocumentTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
