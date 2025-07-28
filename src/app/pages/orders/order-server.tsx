import { User } from "@/typescript/user";
import { OrderWindow } from "./order-window";
import prisma from "@/lib/prisma";


type Props = {
    user: User,
}


export const OrderServer = async ({ user }: Props) => {
    const order = await prisma.orders.findFirst({
        where: {
            user_id: user?.id,
            status: "pending"
        }
    })
    
    if (order) {
        return (
            <OrderWindow order={order} />
        );
    }
    else {
        const newOrder = await prisma.orders.create({
            data: {
                user_id: user?.id,
                total: 0
            }
        })
        return (
            <div>
                <OrderWindow order={newOrder} />
            </div>
        )
    }

}