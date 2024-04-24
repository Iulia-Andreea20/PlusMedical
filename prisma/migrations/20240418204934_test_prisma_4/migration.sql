/*
  Warnings:

  - You are about to drop the `ceva` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ceva";

-- CreateTable
CREATE TABLE "test2" (
    "nume" VARCHAR(100),
    "prenume" VARCHAR(100),
    "id" SERIAL NOT NULL,

    CONSTRAINT "test2_pkey" PRIMARY KEY ("id")
);
