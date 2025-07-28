"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { User } from "@/typescript/user"
import { toast } from "sonner"

const formSchema = z.object({
    star: z.enum(["1", "2", "3", "4", "5"]),
    description: z.string().min(10, {
        message: "Username must be at least 10 characters.",
    }),
})

export function ReviewForm() {
    const [user, setUser] = useState<User | null>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            star: "5",
            description: ""
        }
    })

    useEffect(() => {
        const getUser = async () => {
            const user = await fetch("/api/user").then(user => user.json())
            setUser(user.user);
        }
        getUser();
    }, [])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!user) {
            toast.error("Vous devez vous conncecter");
            return
        } else {
            const res = await fetch("/api/reviews", {
                method: "POST",
                body: JSON.stringify(values)
            }).then(res => res.json());
            toast.success("Avis envoyé")
            form.reset();
        }

    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Partagez votre avis</h2>
                <p className="text-gray-600">Votre opinion compte pour nous !</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="star"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold mb-2 block">
                                    Sélectionnez le nombre d&#39;étoiles
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-3">
                                        <select
                                            {...field}
                                            className="w-40 border-2 border-zinc-200 rounded-xl px-4 py-2 text-zinc-900 bg-white focus:border-zinc-400 transition-all duration-200 hover:border-zinc-300 shadow-sm"
                                        >
                                            <option value="1">⭐</option>
                                            <option value="2">⭐⭐</option>
                                            <option value="3">⭐⭐⭐</option>
                                            <option value="4">⭐⭐⭐⭐</option>
                                            <option value="5">⭐⭐⭐⭐⭐</option>
                                        </select>

                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold mb-2 block">
                                    Partagez votre expérience
                                </FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        className="w-full h-40 border-2 border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 bg-zinc-50 transition-all duration-200 hover:border-zinc-300 resize-none shadow-inner placeholder-zinc-500"
                                        placeholder="Décrivez votre expérience en détail..."
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            className="w-full text-white bg-zinc-800 font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 tracking-wide text-lg"
                            type="submit"
                        >
                            Envoyer mon avis
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}