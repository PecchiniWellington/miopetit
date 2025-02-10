/*
  Warnings:

  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_AnimalAge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductFeatures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductFormat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductPatology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductProtein` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalAge" DROP CONSTRAINT "_AnimalAge_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalAge" DROP CONSTRAINT "_AnimalAge_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBrand" DROP CONSTRAINT "_ProductBrand_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductBrand" DROP CONSTRAINT "_ProductBrand_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFormat" DROP CONSTRAINT "_ProductFormat_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFormat" DROP CONSTRAINT "_ProductFormat_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPatology" DROP CONSTRAINT "_ProductPatology_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductPatology" DROP CONSTRAINT "_ProductPatology_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductProtein" DROP CONSTRAINT "_ProductProtein_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductProtein" DROP CONSTRAINT "_ProductProtein_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
ADD COLUMN     "animalAgeId" UUID,
ADD COLUMN     "formatId" UUID,
ADD COLUMN     "productFeaturesId" UUID,
ADD COLUMN     "productPatologyId" UUID,
ADD COLUMN     "productProteinId" UUID,
ALTER COLUMN "isFeatured" DROP NOT NULL;

-- DropTable
DROP TABLE "_AnimalAge";

-- DropTable
DROP TABLE "_ProductBrand";

-- DropTable
DROP TABLE "_ProductFeatures";

-- DropTable
DROP TABLE "_ProductFormat";

-- DropTable
DROP TABLE "_ProductPatology";

-- DropTable
DROP TABLE "_ProductProtein";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productBrandId_fkey" FOREIGN KEY ("productBrandId") REFERENCES "ProductBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "Format"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_animalAgeId_fkey" FOREIGN KEY ("animalAgeId") REFERENCES "AnimalAge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productFeaturesId_fkey" FOREIGN KEY ("productFeaturesId") REFERENCES "ProductFeatures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productProteinId_fkey" FOREIGN KEY ("productProteinId") REFERENCES "ProductProtein"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productPatologyId_fkey" FOREIGN KEY ("productPatologyId") REFERENCES "ProductPatology"("id") ON DELETE SET NULL ON UPDATE CASCADE;
