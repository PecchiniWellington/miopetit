/*
  Warnings:

  - You are about to drop the column `productProteinId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productProteinId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productProteinId";

-- CreateTable
CREATE TABLE "ProductProteinOnProduct" (
    "productId" UUID NOT NULL,
    "productProteinId" UUID NOT NULL,

    CONSTRAINT "ProductProteinOnProduct_pkey" PRIMARY KEY ("productId","productProteinId")
);

-- AddForeignKey
ALTER TABLE "ProductProteinOnProduct" ADD CONSTRAINT "ProductProteinOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductProteinOnProduct" ADD CONSTRAINT "ProductProteinOnProduct_productProteinId_fkey" FOREIGN KEY ("productProteinId") REFERENCES "ProductProtein"("id") ON DELETE CASCADE ON UPDATE CASCADE;
