-- CreateEnum
CREATE TYPE "AnimalAge" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "animalAge" "AnimalAge";
