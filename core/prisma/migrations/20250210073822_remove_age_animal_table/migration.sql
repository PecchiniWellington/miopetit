/*
  Warnings:

  - You are about to drop the column `animalAgeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `AnimalAge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_animalAgeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "animalAgeId";

-- DropTable
DROP TABLE "AnimalAge";
