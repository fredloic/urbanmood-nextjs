import { OrderServer } from "./order-server";
import { getUser } from "@/lib/auth-server";

export default async function Page() {
    const user = await getUser();

    if (!user) {
        return <p className="text-xl mt-24 text-center">Vous devez d&#39;abord vous connecter.</p>
    }

    return (
        <div>
            <OrderServer user={user} />
        </div>
    )
}