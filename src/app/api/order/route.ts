import prisma from "@/lib/prisma";
import { OrderItem } from "@/typescript/order-item";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const input = await request.json();

    const order = await prisma.orders.findFirst({
        where: {
            user_id: input.user.id,
            status: "pending",
        },
    });

    if (order) {
        const existingItem = await prisma.orderItem.findFirst({
            where: {
                orderId: order.orderId,
                productId: input.product.ProductId,
                size: input.size,
            },
        });

        if (existingItem) {
            await prisma.orderItem.update({
                where: {
                    orderItemId: existingItem.orderItemId,
                },
                data: {
                    quantity: existingItem.quantity + 1,
                },
            });

            await prisma.orders.update({
                where: {
                    orderId: order.orderId,
                },
                data: {
                    total: order.total + existingItem.price,
                },
            });

            return NextResponse.json({ ExistingItem: existingItem });
        }

        const newItem = await prisma.orderItem.create({
            data: {
                orderId: order.orderId,
                productId: input.product.ProductId,
                size: input.size,
                quantity: 1,
                price: input.product.price,
            },
        });

        await prisma.orders.update({
            where: {
                orderId: order.orderId,
            },
            data: {
                total: order.total + newItem.price,
            },
        });

        return NextResponse.json({ NewItem: newItem });
    }

    const newOrder = await prisma.orders.create({
        data: {
            user_id: input.user.id,
            status: "pending",
            total: 0,
        },
    });

    const newItem = await prisma.orderItem.create({
        data: {
            orderId: newOrder.orderId,
            productId: input.product.ProductId,
            size: input.size,
            price: input.product.price,
            quantity: 1,
        },
    });
    await prisma.orders.update({
        where: {
            orderId: newOrder.orderId,
        },
        data: {
            total: newItem.price,
        },
    });

    return NextResponse.json({ NewItem: newItem });
};
