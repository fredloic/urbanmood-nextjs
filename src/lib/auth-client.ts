import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const { signOut, signIn, signUp, useSession } = createAuthClient()



export const signInWithGithub = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    });

}

