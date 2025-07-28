import prisma from "@/lib/prisma"
import { Order } from "@/typescript/order"
import { OrderCard } from "../orders/order-card"
import { OrderItem } from "@/typescript/order-item"


type Props = {
    order: Order
}

export const OrderWindow = async ({ order }: Props) => {
    const items = await prisma.orderItem.findMany({
        where: {
            orderId: order.orderId
        }
    })
    if (!items[0]) return (<p className="mt-4 text-red-400 text-lg">Votre panier vide</p>);



    return (
        <div className="flex flex-col items-center gap-6 w-screen">
            {[...items]
                .sort((a: OrderItem, b: OrderItem) => a.orderItemId - b.orderItemId)
                .map((item: OrderItem) => (
                    <OrderCard item={item} key={item.orderItemId} />
                ))}
            <p className="font-bold text-md">Total : {order?.total?.toFixed(2)} €</p>

        </div>

    )
}