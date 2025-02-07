/*
  Warnings:

  - You are about to drop the column `created_at` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "itemsPrice" DROP DEFAULT,
ALTER COLUMN "totalPrice" DROP DEFAULT,
ALTER COLUMN "shippingPrice" DROP DEFAULT,
ALTER COLUMN "taxPrice" DROP DEFAULT;
