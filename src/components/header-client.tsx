"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User } from "@/typescript/user";



type Props = {
    user: User
}

export const HeaderClient = ({ user }: Props) => {
    const router = useRouter();
    if (!user) {
        return (
            <div className="flex justify-between">
                <img
                    className="w-48 h-auto"
                    src="/Images/logo.png"
                />
                <div className="w-[850px]">
                    <NavigationMenu
                        viewport={true}
                        className="w-[800px]"
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages" className="text-xl">Accueil</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger><Link href="/pages/shop" className="text-xl">Boutique</Link></NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[150px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/shop/men-shop">Homme</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/shop/women-shop">Femme</Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/favourites" className="text-xl">Favoris</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/contact" className="text-xl">Contact</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/orders" className="text-xl">Panier</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/auth/signin" className="text-xl">Se connecter</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

            </div>

        )
    }
    else {

        const signOut = async () => {
            await authClient.signOut();
            router.push("/pages");
            router.refresh();
        }



        return (
            <div className="flex justify-between z-30">
                <img
                    className="w-48 h-auto"
                    src="/Images/logo.png"
                />
                <div className="w-[850px]">
                    <NavigationMenu
                        viewport={false}
                        className="w-[800px]"
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages" className="text-xl">Accueil</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger><Link href="/pages/shop" className="text-xl">Boutique</Link></NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[150px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/shop/men-shop">Homme</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/shop/women-shop">Femme</Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/favourites" className="text-xl">Favoris</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/contact" className="text-xl">Contact</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pages/orders" className="text-xl">Panier</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="border">
                                    <Link href="">
                                        <div className="text-xl flex gap-2 p-2">
                                            {user.image ? (
                                                <Avatar>
                                                    <AvatarImage src={user.image} />
                                                </Avatar>) : null}
                                            <p className="text-lg">{user.name}</p>
                                        </div>
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent >
                                    <ul className="grid w-[170px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/favourites">Mes favoris</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="/pages/purchases">Mes commandes</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Button onClick={() => signOut()}>Se déconnecter</Button>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

            </div>

        );

    }

}