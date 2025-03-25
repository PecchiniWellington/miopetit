-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "affiliateId" UUID;

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "affiliateHomePageId" TEXT,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateHomePage" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "aboutText" TEXT NOT NULL,
    "featuredProducts" TEXT NOT NULL,
    "ctaShopLink" TEXT NOT NULL,
    "bannerText" TEXT NOT NULL,
    "bannerLink" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateHomePage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_slug_key" ON "Affiliate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateHomePage_affiliateId_key" ON "AffiliateHomePage"("affiliateId");

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_affiliateHomePageId_fkey" FOREIGN KEY ("affiliateHomePageId") REFERENCES "AffiliateHomePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
