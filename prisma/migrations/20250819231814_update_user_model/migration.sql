/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'BARBER');

-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_userId_key" ON "Barbershop"("userId");

-- AddForeignKey
ALTER TABLE "Barbershop" ADD CONSTRAINT "Barbershop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
