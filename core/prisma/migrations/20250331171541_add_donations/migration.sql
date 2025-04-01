-- CreateEnum
CREATE TYPE "RequestedProductStatus" AS ENUM ('PENDING', 'FUNDED', 'DELIVERED');

-- CreateTable
CREATE TABLE "Donation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "requestedProductId" UUID NOT NULL,
    "userId" UUID,
    "amount" DOUBLE PRECISION NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestedProduct" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contributorId" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Prodotto senza nome',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetAmount" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "quantity" INTEGER NOT NULL,
    "fundedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "RequestedProductStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "baseProductId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestedProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_requestedProductId_fkey" FOREIGN KEY ("requestedProductId") REFERENCES "RequestedProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedProduct" ADD CONSTRAINT "RequestedProduct_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedProduct" ADD CONSTRAINT "RequestedProduct_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
