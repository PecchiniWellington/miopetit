/*
  Warnings:

  - You are about to alter the column `value` on the `UnitValue` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(5,1)`.

*/
-- AlterTable
ALTER TABLE "UnitValue" ALTER COLUMN "value" DROP DEFAULT,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(5,1);
