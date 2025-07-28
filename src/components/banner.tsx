import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
    return (

        <div className="w-5xl mb-12 mt-4 h-[600px]">
            <div className="relative h-full">
                <img
                    src="/Images/accueil.jpg"
                    className="object-cover w-full h-full rounded-xl"
                />
                <div className="absolute flex flex-col gap-2 items-center bg-black p-4 rounded-md top-40 left-24">
                    <h2 className="text-lg text-white">VENTE PROMOTIONNELLE</h2>
                    <h3 className="text-white font-bold">Jusqu&#39;à 50% de réduction</h3>
                    <Button asChild className="bg-orange-300/80 hover:bg-orange-400/60">
                        <Link href="/pages/shop">ACHETER MAINTENANT</Link>
                    </Button>
                </div>
            </div>

        </div>


    );
}
