/*
  Warnings:

  - A unique constraint covering the columns `[userSlug]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ContributorType" AS ENUM ('PARTNER', 'CANILE', 'GATTILE');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_contributorId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userSlug" TEXT;

-- CreateTable
CREATE TABLE "Contributor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ContributorType" NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "description" TEXT,
    "descriptionLong" TEXT,
    "tags" TEXT[],
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "region" TEXT,
    "zipCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "partitaIva" TEXT,
    "isOnlineShop" BOOLEAN NOT NULL DEFAULT false,
    "isPickupAvailable" BOOLEAN NOT NULL DEFAULT false,
    "deliveryAvailable" BOOLEAN NOT NULL DEFAULT false,
    "openingHours" JSONB,
    "socialLinks" JSONB,
    "whatsappNumber" TEXT,
    "animalsAvailable" INTEGER,
    "animalTypes" TEXT[],
    "acceptsDonations" BOOLEAN NOT NULL DEFAULT false,
    "donationLink" TEXT,
    "volunteerNeeded" BOOLEAN NOT NULL DEFAULT false,
    "needs" TEXT[],
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_slug_key" ON "Contributor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_slug" ON "users"("userSlug");

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
