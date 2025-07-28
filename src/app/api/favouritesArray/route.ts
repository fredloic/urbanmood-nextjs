import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const userId = (searchParams.get("userId"));
    const favourites = await prisma.favourites.findMany({
        where: {
            userId: userId
        }
    })

    return NextResponse.json({ favourites })
}