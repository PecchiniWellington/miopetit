/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UnitOfMeasure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `UnitOfMeasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnitOfMeasure" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasure_name_key" ON "UnitOfMeasure"("name");
