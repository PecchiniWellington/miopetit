-- DropForeignKey
ALTER TABLE "RequestedProduct" DROP CONSTRAINT "RequestedProduct_baseProductId_fkey";

-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "hasFundedBadge" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RequestedProduct" ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "targetAmount" DROP DEFAULT,
ALTER COLUMN "baseProductId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestedProduct" ADD CONSTRAINT "RequestedProduct_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
