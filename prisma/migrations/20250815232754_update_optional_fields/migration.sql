/*
  Warnings:

  - Made the column `availableFromTime` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableFromWeekDay` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableToTime` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableToWeekDay` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `BarbershopService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priceInCents` on table `BarbershopService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Barbershop" ALTER COLUMN "availableFromTime" SET NOT NULL,
ALTER COLUMN "availableFromWeekDay" SET NOT NULL,
ALTER COLUMN "availableToTime" SET NOT NULL,
ALTER COLUMN "availableToWeekDay" SET NOT NULL;

-- AlterTable
ALTER TABLE "BarbershopService" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "priceInCents" SET NOT NULL;
