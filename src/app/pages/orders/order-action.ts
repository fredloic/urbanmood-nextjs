import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const DeleteItem = async (formData: FormData) => {
    "use server"
    const itemId = Number(formData.get("orderItemId"))
    const item = await prisma.orderItem.findUnique({
        where: {
            orderItemId: itemId
        }
    })
    if (item) {
        const itemToDelete = await prisma.orderItem.findUnique({
            where: {
                orderItemId: item.orderItemId,
            }
        })

        if (itemToDelete) {
            if (itemToDelete.quantity > 1) {
                await prisma.orderItem.update({
                    where: {
                        orderItemId: item.orderItemId
                    },
                    data: {
                        quantity: itemToDelete.quantity - 1
                    }
                });

                const order = await prisma.orders.findUnique({
                    where: {
                        orderId: item.orderId
                    }
                })

                if (order) {
                    await prisma.orders.update({
                        where: {
                            orderId: item.orderId
                        },
                        data: {
                            total: order?.total - item.price
                        }
                    })
                }
            }
            else {
                await prisma.orderItem.delete({
                    where: {
                        orderItemId: item.orderItemId
                    }
                })
                const order = await prisma.orders.findUnique({
                    where: {
                        orderId: item.orderId
                    }
                })

                if (order) {
                    await prisma.orders.update({
                        where: {
                            orderId: item.orderId
                        },
                        data: {
                            total: order?.total - item.price
                        }
                    })
                }

            }
        }

        revalidatePath("/");
    }
}


export const RepeatItem = async (formData: FormData) => {
    "use server"
    const itemId = Number(formData.get("orderItemId"))
    const item = await prisma.orderItem.findUnique({
        where: {
            orderItemId: itemId
        }
    })
    if (item) {
        const itemToRepeat = await prisma.orderItem.findUnique({
            where: {
                orderItemId: item.orderItemId,
            }
        })

        if (itemToRepeat) {
            await prisma.orderItem.update({
                where: {
                    orderItemId: item.orderItemId
                },
                data: {
                    quantity: itemToRepeat.quantity + 1
                }
            });

            const order = await prisma.orders.findUnique({
                where: {
                    orderId: item.orderId
                }
            })

            if (order) {
                await prisma.orders.update({
                    where: {
                        orderId: item.orderId
                    },
                    data: {
                        total: order?.total + item.price
                    }
                })
            }
        }
        revalidatePath("/")

    }

}

export const SubmitOrder = async (formData: FormData) => {
    "use server"

    const orderId = Number(formData.get("orderId"))
    await prisma.orders.update({
        where: {
            orderId
        },
        data: {
            status: "done"
        }
    })
    redirect("/pages/purchases")
}


