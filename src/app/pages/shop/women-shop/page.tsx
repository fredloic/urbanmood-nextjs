import { ArticleSectionForView2 } from "@/app/features/article-section2";
import { CategoryBar } from "@/components/category-bar";
import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

export default async function Page() {
    const products = await prisma.products.findMany({
        where: {
            gender_id: 2,
            category_id: 1
        }
    })

    const user = await getUser();

    return (
        <div>
            <CategoryBar gender="FEMME" />
            <ArticleSectionForView2 ProductArray={products} user={user} />
        </div>
    )
}