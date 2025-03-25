/*
  Warnings:

  - You are about to drop the column `affiliateId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Affiliate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AffiliateHomePage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Affiliate" DROP CONSTRAINT "Affiliate_affiliateHomePageId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_affiliateId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "affiliateId",
ADD COLUMN     "contributorId" UUID;

-- DropTable
DROP TABLE "Affiliate";

-- DropTable
DROP TABLE "AffiliateHomePage";

-- CreateTable
CREATE TABLE "ContributorHomePage" (
    "id" TEXT NOT NULL,
    "contributorId" UUID NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "aboutText" TEXT NOT NULL,
    "featuredProducts" TEXT NOT NULL,
    "ctaShopLink" TEXT NOT NULL,
    "bannerText" TEXT NOT NULL,
    "bannerLink" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContributorHomePage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributorHomePage_contributorId_key" ON "ContributorHomePage"("contributorId");

-- AddForeignKey
ALTER TABLE "ContributorHomePage" ADD CONSTRAINT "ContributorHomePage_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
