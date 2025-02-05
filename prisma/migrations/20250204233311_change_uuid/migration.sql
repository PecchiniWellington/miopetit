-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- AddForeignKey
DROP TABLE "Product" CASCADE;

