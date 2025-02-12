/*
  Warnings:

  - You are about to alter the column `value` on the `UnitValue` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "UnitValue" ALTER COLUMN "value" SET DEFAULT 0.0,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);
