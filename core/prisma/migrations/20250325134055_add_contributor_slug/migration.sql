/*
  Warnings:

  - A unique constraint covering the columns `[userSlug]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userSlug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_slug" ON "users"("userSlug");
