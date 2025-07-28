"use client"

import { Product } from "@/typescript/product"
import { ArticleCard2 } from "./article-card2"
import { User } from "@/typescript/user"

type Props = {
    ProductArray: Product[],
    user: User
}

export const ArticleSectionForView2 = ({ ProductArray, user }: Props) => {


    return (
        <div className="flex flex-wrap max-w-7xl gap-10 mx-14 my-8">
            {ProductArray?.map((product) => (
                <ArticleCard2 product={product} key={product.ProductId} user={user} />
            ))}
        </div>
    )
} 