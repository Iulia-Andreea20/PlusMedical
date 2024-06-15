-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "ApprovedAmount" DOUBLE PRECISION,
ADD COLUMN     "RejectedReason" TEXT,
ADD COLUMN     "UpdatedStatus" TIMESTAMP(3);
