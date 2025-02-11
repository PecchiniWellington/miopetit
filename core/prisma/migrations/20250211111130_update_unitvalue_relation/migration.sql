/*
  Warnings:

  - You are about to drop the `ProductFormat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_formatId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitOfMeasureId" UUID;

-- DropTable
DROP TABLE "ProductFormat";

-- CreateTable
CREATE TABLE "ProductUnitValue" (
    "productId" UUID NOT NULL,
    "unitValueId" UUID NOT NULL,

    CONSTRAINT "ProductUnitValue_pkey" PRIMARY KEY ("productId","unitValueId")
);

-- CreateTable
CREATE TABLE "UnitOfMeasure" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "unitValueId" UUID NOT NULL,

    CONSTRAINT "UnitOfMeasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitValue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" INTEGER NOT NULL,

    CONSTRAINT "UnitValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_name_key" ON "UnitOfMeasure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_abbreviation_key" ON "UnitOfMeasure"("abbreviation");

-- AddForeignKey
ALTER TABLE "ProductUnitValue" ADD CONSTRAINT "ProductUnitValue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUnitValue" ADD CONSTRAINT "ProductUnitValue_unitValueId_fkey" FOREIGN KEY ("unitValueId") REFERENCES "UnitValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitOfMeasure" ADD CONSTRAINT "UnitOfMeasure_unitValueId_fkey" FOREIGN KEY ("unitValueId") REFERENCES "UnitValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
