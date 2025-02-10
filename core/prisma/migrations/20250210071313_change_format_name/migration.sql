/*
  Warnings:

  - You are about to drop the `Format` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_formatId_fkey";

-- DropTable
DROP TABLE "Format";

-- CreateTable
CREATE TABLE "ProductFormat" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "size" TEXT NOT NULL,

    CONSTRAINT "ProductFormat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductFormat_size_key" ON "ProductFormat"("size");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "ProductFormat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
