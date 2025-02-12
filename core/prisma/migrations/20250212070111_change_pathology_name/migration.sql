-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productPathologyId" UUID;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productPathologyId_fkey" FOREIGN KEY ("productPathologyId") REFERENCES "ProductPathology"("id") ON DELETE SET NULL ON UPDATE CASCADE;
