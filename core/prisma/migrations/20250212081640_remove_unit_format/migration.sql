/*
  Warnings:

  - You are about to drop the column `productUnitFormatId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `UnitOfMeasure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productUnitFormatId_fkey";

-- DropForeignKey
ALTER TABLE "UnitValue" DROP CONSTRAINT "UnitValue_unitOfMeasureId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productUnitFormatId";

-- DropTable
DROP TABLE "UnitOfMeasure";

-- DropTable
DROP TABLE "UnitValue";
