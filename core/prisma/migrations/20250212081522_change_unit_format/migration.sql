/*
  Warnings:

  - You are about to drop the column `formatId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitOfMeasureId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `abbreviation` on the `UnitOfMeasure` table. All the data in the column will be lost.
  - You are about to drop the `ProductUnitFormat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `UnitOfMeasure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value,unitOfMeasureId]` on the table `UnitValue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productUnitFormatId_fkey";

-- DropForeignKey
ALTER TABLE "ProductUnitFormat" DROP CONSTRAINT "ProductUnitFormat_unitMeasureId_fkey";

-- DropForeignKey
ALTER TABLE "ProductUnitFormat" DROP CONSTRAINT "ProductUnitFormat_unitValueId_fkey";

-- DropIndex
DROP INDEX "UnitOfMeasure_abbreviation_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "formatId",
DROP COLUMN "unitOfMeasureId";

-- AlterTable
ALTER TABLE "UnitOfMeasure" DROP COLUMN "abbreviation",
ADD COLUMN     "code" TEXT NOT NULL DEFAULT 'Kg',
ALTER COLUMN "name" SET DEFAULT 'Kilogram';

-- AlterTable
ALTER TABLE "UnitValue" ADD COLUMN     "unitOfMeasureId" UUID;

-- DropTable
DROP TABLE "ProductUnitFormat";

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_code_key" ON "UnitOfMeasure"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UnitValue_value_unitOfMeasureId_key" ON "UnitValue"("value", "unitOfMeasureId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productUnitFormatId_fkey" FOREIGN KEY ("productUnitFormatId") REFERENCES "UnitValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitValue" ADD CONSTRAINT "UnitValue_unitOfMeasureId_fkey" FOREIGN KEY ("unitOfMeasureId") REFERENCES "UnitOfMeasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
