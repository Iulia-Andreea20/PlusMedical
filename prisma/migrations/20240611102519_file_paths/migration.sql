/*
  Warnings:

  - You are about to drop the column `Content` on the `Documents` table. All the data in the column will be lost.
  - Added the required column `Path` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "Content",
ADD COLUMN     "Path" TEXT NOT NULL;
