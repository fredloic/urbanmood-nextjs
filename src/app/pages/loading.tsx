import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col items-center">
            <Skeleton className="w-[1100px] mb-12 mt-4 h-[650px] bg-zinc-300" />
        </div>
    );
}
