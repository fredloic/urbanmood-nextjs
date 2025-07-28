"use client"
import Link from "next/link"

export const CategoryBar = ({ gender }: { gender: string }) => {
    const genderValue = (gender === "HOMME" ? "men-shop" : "women-shop")


    return (
        <div className="mx-14">
            <p className="text-3xl font-bold mb-3">{gender}</p>
            <div>
                <ul className="flex gap-6">
                    <li className="border border-black px-4 py-2
                    hover:bg-black hover:text-white">
                        <Link href={`/pages/shop/${genderValue}/category/Shirt`}
                            className="text-lg">
                            T-SHIRTS
                        </Link>
                    </li>
                    <li className="border border-black px-4 py-2
                    hover:bg-black hover:text-white">
                        <Link href={`/pages/shop/${genderValue}/category/Pant`}
                            className="text-lg">
                            PANTALONS
                        </Link>
                    </li>
                    <li className="border border-black px-4 py-2
                    hover:bg-black hover:text-white">
                        <Link href={`/pages/shop/${genderValue}/category/Sweater`}
                            className="text-lg">
                            PULLS
                        </Link></li>
                    <li className="border border-black px-4 py-2
                    hover:bg-black hover:text-white">
                        <Link href={`/pages/shop/${genderValue}/category/Accessory`}
                            className="text-lg">
                            ACCESSOIRES
                        </Link>
                    </li>
                </ul>
            </div>
        </div >
    )
}