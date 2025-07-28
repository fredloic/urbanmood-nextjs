/*
  Warnings:

  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "category_id" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "type_id" SET NOT NULL;
