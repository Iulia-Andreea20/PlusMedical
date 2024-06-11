/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `Countries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Name]` on the table `Localities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Name]` on the table `Provinces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Countries_Name_key" ON "Countries"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Localities_Name_key" ON "Localities"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Provinces_Name_key" ON "Provinces"("Name");
