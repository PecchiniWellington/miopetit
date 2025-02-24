/*
  Warnings:

  - You are about to drop the column `email` on the `Address` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Address_email_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "email";
