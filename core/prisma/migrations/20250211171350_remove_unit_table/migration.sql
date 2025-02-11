/*
  Warnings:

  - You are about to drop the column `productUnitValueId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productUnitValueId",
ADD COLUMN     "productUnitFormatId" UUID;

-- CreateTable
CREATE TABLE "ProductUnitFormat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "unitValueId" UUID NOT NULL,
    "unitMeasureId" UUID NOT NULL,

    CONSTRAINT "ProductUnitFormat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitValue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" INTEGER NOT NULL,

    CONSTRAINT "UnitValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitOfMeasure" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "UnitOfMeasure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnitFormat_unitValueId_unitMeasureId_key" ON "ProductUnitFormat"("unitValueId", "unitMeasureId");

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_abbreviation_key" ON "UnitOfMeasure"("abbreviation");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productUnitFormatId_fkey" FOREIGN KEY ("productUnitFormatId") REFERENCES "ProductUnitFormat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUnitFormat" ADD CONSTRAINT "ProductUnitFormat_unitValueId_fkey" FOREIGN KEY ("unitValueId") REFERENCES "UnitValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUnitFormat" ADD CONSTRAINT "ProductUnitFormat_unitMeasureId_fkey" FOREIGN KEY ("unitMeasureId") REFERENCES "UnitOfMeasure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
