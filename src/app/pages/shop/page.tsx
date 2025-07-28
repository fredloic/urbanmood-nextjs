import Link from "next/link";

export default function Shop() {

    return (
        <div className="flex justify-center gap-12">

            <Link href="/pages/shop/men-shop" className="h-[600px] w-96 flex-none hover:grow-1 duration-300">
                <img
                    src="/Images/homme.jpg"
                    className="h-full w-full  object-cover rounded-2xl"
                />
            </Link>

            <Link href="/pages/shop/women-shop" className="h-[600px] w-96 flex-none hover:grow-1 duration-300">
                <img
                    src="/Images/femme.jpg"
                    className="h-full w-full  object-cover rounded-2xl"
                />
            </Link>

        </div>
    )
}