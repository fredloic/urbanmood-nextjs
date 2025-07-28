"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Github } from "lucide-react";
import { signInWithGithub } from "@/lib/auth-client";
import SignInForm from "./signin-form";




export default function Page() {
    return (
        <div className="flex justify-center mt-6">
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                    <CardDescription>Pour que votre expérience sur ce site reste simple et rapide, vous n’avez pas besoin d’utiliser votre vraie adresse e-mail. L’authentification ne comprend pas de vérification par e-mail.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <div>
                        <button
                            className="flex items-center gap-2 px-2 py-2 border rounded-lg
                            hover:scale-105"
                            onClick={() => {
                                signInWithGithub();
                            }}
                        >

                            <Github />Se connecter avec Github
                        </button>
                    </div>

                    <p>Vous n&#39;avez pas de compte ?{" "}
                        <Link
                            href="./signup"
                            className="hover:underline text-indigo-400"
                        >
                            Créer mon compte
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>

    )
}