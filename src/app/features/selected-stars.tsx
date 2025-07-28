import { Star } from "lucide-react";

export const SelectedStars = ({ stars }: { stars: number }) => {

    return (
        <div className="flex gap-2 justify-between w-48">
            {Array.from({ length: 5 }, (_, i) => {
                const isFilled = i < stars;

                return (
                    <Star className={` ${isFilled ? "fill-yellow-400 text-yellow-500" : "text-zinc-200"}`} key={i} />
                )
            })

            }
        </div>
    )
}