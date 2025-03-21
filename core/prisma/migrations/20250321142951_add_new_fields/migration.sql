/*
  Warnings:

  - The values [RESPONDED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `shortDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('PENDING', 'ANSWERED', 'CLOSED');
ALTER TABLE "SupportTicket" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "SupportTicket" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
ALTER TABLE "SupportTicket" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "costPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "shortDescription" TEXT NOT NULL;
