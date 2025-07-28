"use client"

import { Product } from "@/typescript/product"
import { Button } from "../../components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User } from "@/typescript/user"
import { toast } from "sonner"

type Props = {
    product: Product
    user: User
}

export const ArticleCard3 = ({ product, user }: Props) => {
    const router = useRouter();
    const [size, setSize] = useState("");
    const [handleSubmit, setHandleSubmit] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    const updateOrder = async (obj: { product: Product, size: string, user: User }) => {
        const res = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify(obj)
        }).then(res => res.json())
    }

    return (
        <div className="flex flex-col items-center w-screen h-screen relative">
            <Button
                className="absolute left-5"
                onClick={() => { router.back() }}
            >
                Retour
            </Button>

            <div className="flex flex-col items-center gap-1 w-[400px] h-[727px] mt-2 
                bg-neutral-50/20 rounded-xl shadow-xl shadow-zinc-400/70">
                <img
                    src={`${product.url}`}
                    className="my-4 w-[375px] h-[470px] object-cover rounded-xl"
                />
                <p>{product.description}</p>
                <p>{product.price} €</p>

                <fieldset className=" border-2 border-yellow-400 flex justify-center gap-2 w-[380px] p-2 rounded-xl mb-1">
                    <legend className="text-center">Sélectionnez la taille :</legend>
                    <Button
                        className={size === "M" ? "bg-zinc-400" : "null"}
                        onClick={() => setSize("M")}
                    >
                        M
                    </Button>
                    <Button
                        className={size === "L" ? "bg-zinc-400" : "null"}
                        onClick={() => setSize("L")}
                    >
                        L
                    </Button><Button
                        className={size === "XL" ? "bg-zinc-400" : "null"}
                        onClick={() => setSize("XL")}
                    >
                        XL
                    </Button>
                </fieldset>

                {(handleSubmit === true && size === "") && (
                    <p className="text-red-600 m-0">Veuillez d&#39;abord sélectionnez une taille.</p>
                )}

                {!isDisable ? (
                    <Button
                        className="mt-2"
                        onClick={() => {
                            setHandleSubmit(true);
                            if (!user) {
                                toast.error("Vous devez vous connecter")
                            }
                            else if (size !== "") {
                                setIsDisable(true)
                                setTimeout(() => setIsDisable(false), 1500)
                                updateOrder({ product, size, user })
                                router.refresh();
                                toast.message("Article ajouté au pannier")
                            }
                        }}>
                        Ajouter au panier
                    </Button>) : (
                    <Button className="mt-2 bg-zinc-300">
                        Ajouté au panier
                    </Button>
                )
                }



            </div>
        </div>
    )
}