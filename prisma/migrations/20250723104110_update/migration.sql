/*
  Warnings:

  - You are about to drop the `_UserFavourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFavourites" DROP CONSTRAINT "_UserFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavourites" DROP CONSTRAINT "_UserFavourites_B_fkey";

-- DropTable
DROP TABLE "_UserFavourites";

-- CreateTable
CREATE TABLE "favourites" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favourites_userId_productId_key" ON "favourites"("userId", "productId");

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("ProductId") ON DELETE CASCADE ON UPDATE CASCADE;
