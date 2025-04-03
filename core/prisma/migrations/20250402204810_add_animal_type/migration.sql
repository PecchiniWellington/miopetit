/*
  Warnings:

  - Added the required column `animalType` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "animalType" TEXT NOT NULL;
