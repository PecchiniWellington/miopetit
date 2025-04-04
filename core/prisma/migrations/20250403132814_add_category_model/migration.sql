/*
  Warnings:

  - Added the required column `categoryEventId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "categoryEventId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CategoryEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "contributorId" UUID NOT NULL,

    CONSTRAINT "CategoryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryEvent_name_contributorId_key" ON "CategoryEvent"("name", "contributorId");

-- AddForeignKey
ALTER TABLE "CategoryEvent" ADD CONSTRAINT "CategoryEvent_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryEventId_fkey" FOREIGN KEY ("categoryEventId") REFERENCES "CategoryEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
