import prisma from "@/lib/prisma"
import { Order } from "@/typescript/order"
import { OrderCard } from "./order-card"
import { SubmitOrder } from "./order-action"
import { Button } from "@/components/ui/button"

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
                .sort((a, b) => a.orderItemId - b.orderItemId)
                .map((item) => (
                    <OrderCard item={item} key={item.orderItemId} />
                ))}
            <p className="font-bold text-md">Total : {order?.total?.toFixed(2)} €</p>
            <form action={SubmitOrder}>
                <input className="hidden" name="orderId" value={order.orderId} readOnly />
                <Button type="submit" className="w-24 bg-red-500 hover:bg-red-400">Payer</Button>
            </form>
        </div>

    )
}