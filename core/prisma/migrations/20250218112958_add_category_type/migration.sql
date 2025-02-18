/*
  Warnings:

  - Added the required column `categoryType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryType" TEXT NOT NULL;
