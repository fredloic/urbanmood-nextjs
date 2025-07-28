import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Order } from "@/typescript/order"
import { OrderItem } from "@/typescript/order-item"
import { Product } from "@/typescript/product"
import Link from "next/link"

type Props = {
    order: Order
}

export default async function PurchasesList({ order }: Props) {
    let month;
    const orderItems = await prisma.orderItem.findMany({
        where: {
            orderId: order.orderId
        }
    })

    const ProductId: number[] = [];

    orderItems?.map((item: OrderItem) => (
        ProductId.push(item.productId)
    ))

    const products: Product[] = await prisma.products.findMany({
        where: {
            ProductId: {
                in: ProductId
            }
        }
    })

    const orders: Order | null = await prisma.orders.findUnique({
        where: { orderId: order.orderId }
    })


    const date = orders?.updated_at;
    if (date) {
        month = (date.getMonth() + 1).toString().padStart(2, "0");
    }
    const jour = date?.getDate().toString().padStart(2, "0");

    const affichage = `Acheté le ${jour}/${month}`;

    return (
        <div className="flex justify-center">


            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            Achat
                            <Link href={`/pages/purchases/${order.orderId}`}>
                                <Button className="hover:bg-black/70">Voir ma commande</Button>
                            </Link>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        <p>{affichage}</p>
                        <p>{order?.total?.toFixed(2)} €</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3 w-[600px]">
                        {
                            products?.map((product) => (
                                <img
                                    src={`${product.url}`}
                                    className="w-36 h-48 object-cover rounded-md"
                                    key={product.ProductId}
                                />
                            ))
                        }
                    </div>
                    <Link href="/pages/reviews">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-6">Donner un avis</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )




}