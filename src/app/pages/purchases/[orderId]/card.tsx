import prisma from "@/lib/prisma";
import { OrderItem } from "@/typescript/order-item";



type Props = {
    item: OrderItem,
}

export const Card = async ({ item }: Props) => {
    const product = await prisma.products.findUnique({
        where: {
            ProductId: item.productId
        }
    })


    return (

        <div className="flex items-center rounded-xl h-52 p-4
        bg-zinc-100 w-[50%] shadow-lg shadow-zinc-400 gap-24">
            <img
                className="w-[180px] h-[180px] object-cover rounded-xl"
                src={`${product?.url}`}
            />
            <div>
                <p>{product?.description}</p>
                <p>Prix : {product?.price} €</p>
                <p>Taille : {item.size}</p>
                <p>Quantité : {item.quantity}</p>
            </div>
        </div>

    )
}