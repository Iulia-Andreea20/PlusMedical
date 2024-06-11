/*
  Warnings:

  - Changed the type of `Status` on the `Documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "Status",
ADD COLUMN     "Status" "DocumentStatus" NOT NULL;
