/*
  Warnings:

  - Made the column `url` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "url" SET NOT NULL;
