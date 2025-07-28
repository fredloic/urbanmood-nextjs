import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const data = await request.json()
    const user = await getUser();


    const newReview = await prisma.reviews.create({
        data: {
            description: data.description,
            star: Number(data.star),
            username: user?.name,
            userId: user?.id
        }
    })

    return NextResponse.json({ newReview })
}