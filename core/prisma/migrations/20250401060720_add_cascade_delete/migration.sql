-- DropForeignKey
ALTER TABLE "RequestedProduct" DROP CONSTRAINT "RequestedProduct_contributorId_fkey";

-- AddForeignKey
ALTER TABLE "RequestedProduct" ADD CONSTRAINT "RequestedProduct_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
