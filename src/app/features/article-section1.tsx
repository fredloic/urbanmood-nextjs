import { Product } from "@/typescript/product"
import { ArticleCard1 } from "./article-card1"

type Props = {
    ProductArray: Product[]
}

export const ArticleSectionForView1 = ({ ProductArray }: Props) => {
    return (
        <div className="flex flew-wrap max-w-[1400px] gap-10 m-8">
            {ProductArray?.map((product) => (
                <ArticleCard1 product={product} key={product.ProductId} />
            ))}
        </div>
    )
} 