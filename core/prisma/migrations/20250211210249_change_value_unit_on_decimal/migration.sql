/*
  Warnings:

  - You are about to alter the column `value` on the `UnitValue` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "UnitValue" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);
