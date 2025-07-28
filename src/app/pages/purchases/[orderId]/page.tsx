import prisma from "@/lib/prisma"
import { Card } from "./card";



type Props = {
    params: Promise<{ orderId: string }>
}


export default async function Page(props: Props) {
    const params = await props.params;
    const order = await prisma.orders.findUnique({
        where: {
            orderId: Number(params.orderId)
        }
    })
    const items = await prisma.orderItem.findMany({
        where: {
            orderId: order?.orderId
        }
    })

    return (
        <div className="flex flex-col items-center gap-6 w-screen mt-6">
            <h1 className="font-bold text-2xl">Détails de la commande</h1>
            {[...items]
                .sort((a, b) => a.orderItemId - b.orderItemId)
                .map((item) => (
                    <Card item={item} key={item.orderItemId} />
                ))}
            <p className="font-bold text-md">Total : {order?.total?.toFixed(2)} €</p>

        </div>

    )
}