import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const ProductId = Number(searchParams.get("ProductId"))
    const user = await getUser()
    const favourites = await prisma.favourites.findFirst({
        where: {
            userId: user?.id,
            productId: ProductId
        }
    })

    return NextResponse.json({ favourites })
}



export const POST = async (request: NextRequest) => {
    const input = await request.json();
    const user = await getUser();

    const isAlready = await prisma.favourites.findFirst({
        where: {
            userId: user?.id,
            productId: input?.product?.ProductId
        }
    })

    if (isAlready) return NextResponse.json("Requête POST réussie")

    await prisma.favourites.create({
        data: {
            userId: user?.id,
            productId: input?.product?.ProductId
        }
    })
    revalidatePath("/");

    return NextResponse.json("Requête POST réussie")

}



export const DELETE = async (request: NextRequest) => {
    const input = await request.json();
    const user = await getUser();

    await prisma.favourites.delete({
        where: {
            id: input.favourite.id,
            userId: user?.id
        }
    });

    revalidatePath("/");
    return NextResponse.json("Requête DELETE réussie")
}



