"use client"
import { Product } from "@/typescript/product"
import { Button } from "../../components/ui/button"
import { useRouter } from "next/navigation"


type ProductProps = {
    product: Product
}

export const ArticleCard1 = ({ product }: ProductProps) => {

    const router = useRouter()

    return (
        <div className="flex flex-col items-center gap-3 bg-zinc-200 
        w-64 p-4 rounded-md shadow-xs
        hover:-translate-y-2 hover:shadow-lg hover:shadow-zinc-500 duration-300">
            <img
                src={`${product.url}`}
                className="rounded-md w-64 h-64 object-cover"
                alt="photo"
            />
            <p className="mb-3">{product.description}</p>
            <p>{product.price} €</p>
            <Button
                className="bg-black hover:bg-black/70 brightness-[90%]"
                onClick={() => {
                    router.push(`/pages/shop/${product.ProductId}`)
                }}
            >
                VOIR ARTICLE
            </Button>
        </div>
    )
}