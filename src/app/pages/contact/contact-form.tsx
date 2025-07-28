"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const formSchema = z.object({
    username: z.string().min(3, {
        message: "Le nom d'utilisateur doit comporter au moins 3 caractères.",
    }),
    email: z.email(),
    message: z.string().min(10, {
        message: "Le message doit comporter au moins 10 caractères."
    }
    )
})

export default function ContactForm() {
    const [submit, setSubmit] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            message: ""
        }
    })



    const onSubmit = () => {
        form.reset();
        setSubmit(true);
    }

    return (
        <div>
            {submit ? (
                <Card className="w-2xl p-6 text-center h-48 mt-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-green-600 mb-2">Merci pour votre message !</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700">
                        Nous vous répondrons dans les plus brefs délais.
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-2xl p-6">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Contactez-nous</CardTitle>
                        <CardContent className="text-center">Une question, une suggestion ou un souci ? Écrivez-nous !</CardContent>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-md font-bold">Nom</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-2 border-zinc-200 h-12 rounded-xl"
                                                    placeholder="Votre nom" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-md font-bold">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-2 border-zinc-200 h-12 rounded-xl"
                                                    placeholder="Votre nom" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-md font-bold">Message</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    className="border rounded-xl p-4 h-48 bg-zinc-50 resize-none"
                                                    placeholder="Décrivez votre demande..." {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="rounded-xl w-full"
                                    type="submit"
                                >
                                    Envoyer
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

            )}
        </div>
    )
}