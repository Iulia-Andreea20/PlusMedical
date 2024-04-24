-- AlterTable
ALTER TABLE "test" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "test_pkey" PRIMARY KEY ("id");
