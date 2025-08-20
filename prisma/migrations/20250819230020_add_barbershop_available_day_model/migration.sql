/*
  Warnings:

  - You are about to drop the column `availableFromTime` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `availableFromWeekDay` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `availableToTime` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `availableToWeekDay` on the `Barbershop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "availableFromTime",
DROP COLUMN "availableFromWeekDay",
DROP COLUMN "availableToTime",
DROP COLUMN "availableToWeekDay";

-- CreateTable
CREATE TABLE "BarbershopAvailableDay" (
    "id" TEXT NOT NULL,
    "availableDay" INTEGER NOT NULL,
    "availableFromTime" TIME NOT NULL,
    "availableToTime" TIME NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarbershopAvailableDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BarbershopAvailableDay" ADD CONSTRAINT "BarbershopAvailableDay_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
