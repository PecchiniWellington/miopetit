/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Address_email_key" ON "Address"("email");
