/*
  Warnings:

  - You are about to drop the column `created_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productFeaturesId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ProductBrand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductPathology` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductProtein` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductUnitFormat` will be added. If there are existing duplicate values, this will fail.
  - Made the column `animalAge` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `ProductBrand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductPathology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductProtein` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductUnitFormat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productFeaturesId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productPathologyId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "updated_at",
ADD COLUMN     "parentId" UUID;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "productFeaturesId",
ALTER COLUMN "animalAge" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductBrand" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductFeatures" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "ProductPathology" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductProtein" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductUnitFormat" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Favorite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "ProductFeatureOnProduct" (
    "productId" UUID NOT NULL,
    "productFeatureId" UUID NOT NULL,

    CONSTRAINT "ProductFeatureOnProduct_pkey" PRIMARY KEY ("productId","productFeatureId")
);

-- CreateTable
CREATE TABLE "ProductPathologyOnProduct" (
    "productId" UUID NOT NULL,
    "pathologyId" UUID NOT NULL,

    CONSTRAINT "ProductPathologyOnProduct_pkey" PRIMARY KEY ("productId","pathologyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductBrand_slug_key" ON "ProductBrand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPathology_slug_key" ON "ProductPathology"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductProtein_slug_key" ON "ProductProtein"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnitFormat_slug_key" ON "ProductUnitFormat"("slug");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureOnProduct" ADD CONSTRAINT "ProductFeatureOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureOnProduct" ADD CONSTRAINT "ProductFeatureOnProduct_productFeatureId_fkey" FOREIGN KEY ("productFeatureId") REFERENCES "ProductFeatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPathologyOnProduct" ADD CONSTRAINT "ProductPathologyOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPathologyOnProduct" ADD CONSTRAINT "ProductPathologyOnProduct_pathologyId_fkey" FOREIGN KEY ("pathologyId") REFERENCES "ProductPathology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "category_slug_idx" RENAME TO "Category_slug_key";
