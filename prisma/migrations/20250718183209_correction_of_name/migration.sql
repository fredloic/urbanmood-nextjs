/*
  Warnings:

  - You are about to drop the column `type_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_type_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "type_id",
ADD COLUMN     "gender_id" INTEGER;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "types";

-- CreateTable
CREATE TABLE "gender" (
    "genderId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("genderId")
);

-- CreateTable
CREATE TABLE "category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "gender"("genderId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION;
