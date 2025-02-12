-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productUnitFormatId" UUID;

-- CreateTable
CREATE TABLE "UnitValue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "unitOfMeasureId" UUID,

    CONSTRAINT "UnitValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitOfMeasure" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'Kilogram',
    "code" TEXT NOT NULL DEFAULT 'Kg',

    CONSTRAINT "UnitOfMeasure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitValue_value_unitOfMeasureId_key" ON "UnitValue"("value", "unitOfMeasureId");

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_name_key" ON "UnitOfMeasure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_code_key" ON "UnitOfMeasure"("code");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productUnitFormatId_fkey" FOREIGN KEY ("productUnitFormatId") REFERENCES "UnitValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitValue" ADD CONSTRAINT "UnitValue_unitOfMeasureId_fkey" FOREIGN KEY ("unitOfMeasureId") REFERENCES "UnitOfMeasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
