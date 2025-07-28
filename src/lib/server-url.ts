export const getServerUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000"
    }

    if (process.env.VERCEL_ENV === "production") {
        return "https://prod.https://vercel.com/ashhs-projects-75eb2bc8";
    }

    if (process.env.VERCEL_ENV === "preview") {
        return process.env.VERCEL_URL
    }
    return "https://prod.com";
}