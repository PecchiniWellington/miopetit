/*
  Warnings:

  - You are about to alter the column `percentageDiscount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "percentageDiscount" SET DEFAULT 0,
ALTER COLUMN "percentageDiscount" SET DATA TYPE INTEGER;
