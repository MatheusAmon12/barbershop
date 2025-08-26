/*
  Warnings:

  - You are about to drop the column `price` on the `BarbershopService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "availableFromTime" TIME,
ADD COLUMN     "availableFromWeekDay" INTEGER,
ADD COLUMN     "availableToTime" TIME,
ADD COLUMN     "availableToWeekDay" INTEGER;

-- AlterTable
ALTER TABLE "BarbershopService" DROP COLUMN "price",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "priceInCents" INTEGER;
