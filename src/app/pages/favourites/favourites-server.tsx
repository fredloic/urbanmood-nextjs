"use client"

import { FavouritesItems } from "./favourites-items";
import { User } from "@/typescript/user";
import { useEffect, useState } from "react";
import { Favourite } from "@/typescript/favourite";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
    const [user, setUser] = useState<User | null>()
    const [favourites, setFavourites] = useState<Favourite[] | null>()
    const [userNotFound, setUserNotFound] = useState<boolean>(false)
    const [data, setData] = useState(false)

    useEffect(() => {
        const findUser = async () => {
            const res = await fetch("/api/user").then(res => res.json())
            setUser(res.user);
            if (!res.user) setUserNotFound(true)
        }
        findUser();
    }, [])


    useEffect(() => {
        if (user) {
            const FindFavourites = async () => {
                const res = await fetch(`/api/favouritesArray?userId=${user.id}`).then(res => res.json())
                setFavourites(res.favourites);
            }
            FindFavourites();
        }
        setTimeout(() => {
            setData(true);
        }, 1000)
    }, [user])

    if (data === false) {
        return (
            <div className="flex flex-wrap justify-center gap-14 max-w-[1430px] m-0 p-2 mt-8">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-72 h-[400px] rounded-2xl shadow-md border animate-pulse bg-[#f4f0eb] flex flex-col overflow-hidden p-4"
                    >
                        <Skeleton className="w-full h-80 bg-zinc-300" />

                    </div>
                ))}
            </div>
        )
    } else {
        if (userNotFound) {
            return <p className="text-xl mt-24 text-center">Vous devez vous connecter.</p>
        }
        else if (favourites && favourites.length > 0) {
            return (
                <div className="flex flex-wrap gap-6 max-w-[1300px] m-8 gap-8">
                    {
                        favourites.map((fav) => {
                            return <FavouritesItems item={fav} key={fav.id} />
                        })
                    }

                </div>
            )
        } else {
            return <p className="text-xl mt-24 text-center">Votre liste de favoris est vide.</p>
        }
    }





}