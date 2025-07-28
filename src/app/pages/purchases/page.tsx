import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma"
import PurchasesList from "./purchases-list";
import { Order } from "@/typescript/order";



export default async function Page() {
    const user = await getUser();
    const orders = await prisma.orders.findMany({
        where: {
            status: "done",
            user_id: user?.id
        }
    })
    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-bold text-2xl text-center">Mes commandes</h1>
            {
                orders?.sort((a: Order, b: Order) => b.orderId - a.orderId)
                    ?.map((order: Order) => (
                        <PurchasesList order={order} key={order.orderId} />
                    ))
            }
        </div>
    )
}