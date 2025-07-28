
import { ArticleCard3 } from "@/app/features/article-card3";
import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

type Props = {
    params: Promise<{ productId: string }>
}

export default async function Page(props: Props) {
    const params = await props.params;
    const id = parseInt(params.productId)
    const user = await getUser();
    const product = await prisma.products.findFirst({
        where: {
            ProductId: id
        }
    })

    if (product) {
        return (
            <ArticleCard3 product={product} user={user} />
        )
    }


}