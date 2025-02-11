/*
  Warnings:

  - You are about to drop the column `animalAge` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `ProductUnitValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `ProductUnitValue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productPatologyId_fkey";

-- DropForeignKey
ALTER TABLE "ProductUnitValue" DROP CONSTRAINT "ProductUnitValue_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "animalAge",
ADD COLUMN     "productPathologyId" UUID,
ADD COLUMN     "productUnitValueId" UUID;

-- AlterTable
ALTER TABLE "ProductUnitValue" DROP CONSTRAINT "ProductUnitValue_pkey",
DROP COLUMN "productId",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "ProductUnitValue_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productUnitValueId_fkey" FOREIGN KEY ("productUnitValueId") REFERENCES "ProductUnitValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productPathologyId_fkey" FOREIGN KEY ("productPathologyId") REFERENCES "ProductPathology"("id") ON DELETE SET NULL ON UPDATE CASCADE;
