-- CreateTable
CREATE TABLE "reviews" (
    "reviewId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "username" TEXT,
    "userId" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewId")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
