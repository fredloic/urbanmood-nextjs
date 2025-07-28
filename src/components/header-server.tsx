import { getUser } from "@/lib/auth-server";
import { HeaderClient } from "./header-client";

export const HeaderServer = async () => {
    const user = await getUser();

    return (
        <HeaderClient user={user} />
    )
}