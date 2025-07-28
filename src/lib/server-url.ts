export const getServerUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000"
    }

    if (process.env.VERCEL_ENV === "production") {
        return "https://urbanmood-nextjs-drab.vercel.app";
    }

    if (process.env.VERCEL_ENV === "preview") {
        return `https://${process.env.VERCEL_URL}`
    }
    return "https://fallback.com";
}
