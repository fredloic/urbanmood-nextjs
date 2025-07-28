import { ArticleSectionForView2 } from "@/app/features/article-section2";
import { CategoryBar } from "@/components/category-bar";
import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

type PageProps = {
    params: Promise<{ categoryName: string }>
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    const category = await prisma.category.findFirst({
        where: {
            name: params.categoryName
        }
    })
    const products = await prisma.products.findMany({
        where: {
            category_id: category?.categoryId,
            gender_id: 2
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