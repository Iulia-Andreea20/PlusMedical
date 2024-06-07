/*
  Warnings:

  - You are about to drop the `PrismaTEST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PrismaTEST";

-- DropTable
DROP TABLE "test2";

-- CreateTable
CREATE TABLE "Users" (
    "UserId" SERIAL NOT NULL,
    "LastName" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "Mail" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CoSigner" BOOLEAN NOT NULL DEFAULT false,
    "RoleId" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "RoleId" SERIAL NOT NULL,
    "Role" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("RoleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Mail_key" ON "Users"("Mail");

-- CreateIndex
CREATE UNIQUE INDEX "Users_PhoneNumber_key" ON "Users"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_Role_key" ON "Roles"("Role");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Roles"("RoleId") ON DELETE RESTRICT ON UPDATE CASCADE;
