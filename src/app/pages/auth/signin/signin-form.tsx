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

const SignInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }),
})

export default function SignInForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,

        }, {
            onSuccess: () => {
                router.push("/pages");
                router.refresh();

            },
            onError: (error) => {
                toast.error(error.error.message)
            }


        }
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Input type="password" {...field}
                                    autoComplete="current-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button type="submit">Se connecter</Button>
                </div>

            </form>
        </Form>
    )
}
