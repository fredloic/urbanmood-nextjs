import { getUser } from "@/lib/auth-server"
import { NextResponse } from "next/server";

export const GET = async () => {
    const user = await getUser();
    return NextResponse.json({ user });
}