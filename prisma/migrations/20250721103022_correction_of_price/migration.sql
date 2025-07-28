/*
  Warnings:

  - You are about to alter the column `total` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE INTEGER;
