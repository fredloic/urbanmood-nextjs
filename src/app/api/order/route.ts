import prisma from "@/lib/prisma";
import { OrderItem } from "@/typescript/order-item";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const input = await request.json();
    let NewItem: OrderItem;
    let ExistingItem: OrderItem | null


    const order = await prisma.orders.findFirst({
        where: {
            user_id: input.user.id,
            status: "pending"
        }
    })


    if (order) {
        ExistingItem = await prisma.orderItem.findFirst({
            where: {
                orderId: order.orderId,
                productId: input.product.ProductId,
                size: input.size
            }
        })

        if (ExistingItem) {
            await prisma.orderItem.update({
                where: {
                    orderItemId: ExistingItem.orderItemId
                },
                data: {
                    quantity: ExistingItem.quantity + 1
                }
            })

            const PriceUpdated = order.total + ExistingItem.price

            await prisma.orders.update({
                where: {
                    orderId: order.orderId,
                },
                data: {
                    total: PriceUpdated
                }
            })

            return NextResponse.json({ ExistingItem })

        } else {
            NewItem = await prisma.orderItem.create({
                data: {
                    orderId: order?.orderId,
                    productId: input.product.ProductId,
                    size: input.size,
                    quantity: 1,
                    price: input.product.price
                }
            })
        }

        const PriceUpdated = order.total + NewItem.price

        await prisma.orders.update({
            where: {
                orderId: order.orderId,
            },
            data: {
                total: PriceUpdated
            }
        })

    }
    else {
        const newOrder = await prisma.orders.create({
            data: {
                user_id: input.user.id,
                status: "pending",
                total: 0
            }
        })

        NewItem = await prisma.orderItem.create({
            data: {
                orderId: newOrder.orderId,
                productId: input.product.ProductId,
                size: input.size,
                price: input.product.price,
                quantity: 1
            }
        })

    }
    return NextResponse.json({ NewItem })
}



