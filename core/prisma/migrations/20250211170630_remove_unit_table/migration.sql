/*
  Warnings:

  - You are about to drop the `ProductUnitValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitOfMeasure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productUnitValueId_fkey";

-- DropForeignKey
ALTER TABLE "ProductUnitValue" DROP CONSTRAINT "ProductUnitValue_unitValueId_fkey";

-- DropForeignKey
ALTER TABLE "UnitOfMeasure" DROP CONSTRAINT "UnitOfMeasure_unitValueId_fkey";

-- DropTable
DROP TABLE "ProductUnitValue";

-- DropTable
DROP TABLE "UnitOfMeasure";

-- DropTable
DROP TABLE "UnitValue";
