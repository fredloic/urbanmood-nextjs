"use client"

import { Favourite } from "@/typescript/favourite"
import { Product } from "@/typescript/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
    item: Favourite
}

export const FavouritesItems = ({ item }: Props) => {
    const [favourite, setFavourite] = useState<Favourite | null>()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>()

    useEffect(() => {
        const FindProduct = async () => {
            const res = await fetch(`/api/products?ProductId=${item.productId}`).then(res => res.json())
            setProduct(res.res)
        }
        FindProduct()
    }, [])


    useEffect(() => {
        if (!product) return;
        const isFavourite = async () => {
            const res = await fetch(`/api/favourite?ProductId=${product?.ProductId}`).then(res => res.json());
            setFavourite(res.favourites)
        }
        isFavourite();

    }, [product, refresh])

    const DeleteFavourite = async (obj: { favourite: Favourite }) => {
        const res = await fetch("/api/favourite", {
            method: "DELETE",
            body: JSON.stringify(obj)
        }).then(res => res.json())
    }

    const AddFavourite = async (obj: { product: Product }) => {
        const res = await fetch("/api/favourite", {
            method: "POST",
            body: JSON.stringify(obj)
        }).then(res => res.json())
    }

    if (product) {
        if (favourite) {
            return (
                <div className="relative hover:-translate-y-2 hover:shadow-2xl hover-shadow-zinc-400 duration-300 h-[400px]">
                    <button className="text-red-500 text-4xl absolute top-6 right-6 z-10"
                        onClick={() => {
                            DeleteFavourite({ favourite })
                            setRefresh(!refresh)
                            router.refresh()
                        }}>
                        ♥
                    </button>

                    <Link href={`/pages/shop/${product.ProductId}`} className="relative h-full">
                        <div className="flex flex-col items-center gap-2 w-[300px] h-[400px] bg-[#f4f0eb] p-4 my-2 
                    rounded-md border">
                            <img
                                src={`${product.url}`}
                                className="w-72 h-72 object-cover rounded-md mb-1"
                            />
                            <p>{product.description}</p>
                            <p>{product.price} €</p>
                        </div>
                    </Link>
                </div>

            );
        } else {
            return (
                <div className="relative hover:-translate-y-2 hover:shadow-2xl hover-shadow-zinc-400 duration-300 h-[400px]">
                    <button className="text-zinc-400 hover:text-red-500 text-4xl absolute z-10 top-6 right-6"
                        onClick={() => {
                            AddFavourite({ product })
                            setRefresh(!refresh)
                            router.refresh()
                        }}>
                        ♥
                    </button>

                    <Link href={`/pages/shop/${product.ProductId}`} className="relative h-full">
                        <div className="flex flex-col items-center gap-2 w-[300px] h-[400px] bg-[#f4f0eb] p-4 my-2 
                    rounded-md border">

                            <img
                                src={`${product.url}`}
                                className="w-72 h-72 object-cover rounded-md mb-1"
                            />
                            <p>{product.description}</p>
                            <p>{product.price} €</p>
                        </div>
                    </Link>
                </div>

            );

        }

    }


}