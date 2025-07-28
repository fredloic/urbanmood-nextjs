import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
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
}