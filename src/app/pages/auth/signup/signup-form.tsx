"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const SignUpFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.email(),
    password: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }),
})

export default function SignUpForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
        await authClient.signUp.email({
            name: values.username,
            email: values.email,
            password: values.password,

        }, {
            onSuccess: () => {
                router.push("/pages")
                router.refresh();
            },
            onError: (error) => {
                toast.error(error.error.message);
            }


        }
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d&#39;utilisateur</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button type="submit">Créer mon compte</Button>
                </div>

            </form>
        </Form>
    )
}
