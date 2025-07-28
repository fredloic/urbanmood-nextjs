import { ArticleSectionForView1 } from "@/app/features/article-section1";
import Banner from "@/components/banner";
import prisma from "@/lib/prisma";
import { ReviewSection } from "../features/review-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    const BestSellers = await prisma.products.findMany({
        where: {
            ProductId: {
                in: [77, 88, 20, 51]
            }
        }
    })


    const NewArticles = await prisma.products.findMany({
        where: {
            ProductId: {
                in: [14, 2, 30, 87]
            }
        }
    })

    await new Promise(resolve => setTimeout(resolve, 500))



    return (
        <div className="flex flex-col items-center">

            <Banner />

            <p className="text-black text-3xl font-bold mt-8mb-2">
                Meilleures ventes
            </p>

            <ArticleSectionForView1 ProductArray={BestSellers} />

            <p className="text-black text-3xl font-bold mt-8 mb-2">
                Nouveautés
            </p>

            <ArticleSectionForView1 ProductArray={NewArticles} />

            <p className="text-black text-3xl font-bold mt-16 mb-8">
                Avis
            </p>

            <ReviewSection />

            <Link href="/pages/reviews" className="mt-8">
                <Button> Vous êtes clients ? Donnez votre avis.</Button>
            </Link>
        </div>
    );
}
