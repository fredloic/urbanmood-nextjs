import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const ProductId = Number(searchParams.get("ProductId"))

    const res = await prisma.products.findUnique({
        where: {
            ProductId: ProductId
        }
    })
    return NextResponse.json({ res });
}

