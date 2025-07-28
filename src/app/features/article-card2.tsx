"use client"

import { Favourite } from "@/typescript/favourite";
import { Product } from "@/typescript/product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/typescript/user";
import { toast } from "sonner";


type Props = {
    product: Product,
    user: User | null
}

export const ArticleCard2 = ({ product, user }: Props) => {
    const [favourite, setFavourite] = useState<Favourite | null>()
    const [refresh, setRefresh] = useState(false)
    const router = useRouter()


    useEffect(() => {
        const isFavourite = async () => {
            if (!user) {
                setFavourite(null)
            } else {
                const res = await fetch(`/api/favourite?ProductId=${product.ProductId}`).then(res => res.json())
                setFavourite(res.favourites)
            }
        }
        isFavourite();
    }, [refresh])

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


    if (favourite) {
        return (
            <div className="relative hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-400 duration-300 h-xl">
                <button className="text-red-500 text-4xl absolute z-30 top-6 right-5"
                    onClick={() => {
                        DeleteFavourite({ favourite })
                        setRefresh(!refresh)
                        router.refresh()
                    }}>
                    ♥
                </button>

                <Link href={`/pages/shop/${product.ProductId}`} className="relative h-full">
                    <div className="flex flex-col items-center gap-2 w-2xs h-full bg-[#f4f0eb] p-4 my-2 
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
            <div className="relative hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-400 duration-300 h-xl">
                <button className="text-zinc-400 hover:text-red-500 text-4xl absolute z-30 top-6 right-5"
                    onClick={() => {
                        if (user) {
                            AddFavourite({ product })
                            setRefresh(!refresh)
                            router.refresh()
                        } else {
                            toast.error("Vous devez d&#39;abord vous connecter")
                        }

                    }}>
                    ♥
                </button>

                <Link href={`/pages/shop/${product.ProductId}`} className="relative h-full">
                    <div className="flex flex-col items-center gap-2 w-2xs h-full bg-[#f4f0eb] p-4 my-2 
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