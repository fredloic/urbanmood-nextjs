import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-yellow-100 h-full w-full flex flex-col items-center">

      <div className="absolute top-48 text-black text-center p-2 text-2xl">
        <p className="mt-24 mb-8">Ce site est un projet étudiant à des fins pédagogiques. Les visuels sont empruntés et utilisés uniquement à titre d&#39;apprentissage.</p>
        <Link href="/pages">
          <Button className="text-xl text-white hover:scale-105">
            Voir le site
          </Button>
        </Link>

      </div >
    </div>



  )

}