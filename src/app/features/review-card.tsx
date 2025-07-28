import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Review } from "@/typescript/review"
import { SelectedStars } from "./selected-stars"

type Props = {
    review: Review
}

export const ReviewCard = ({ review }: Props) => {
    return (
        <Card className="w-72">
            <CardHeader>
                <CardTitle>
                    <SelectedStars stars={review.star} />
                </CardTitle>
                <CardDescription className="font-bold text-black text-lg">

                    {review.username}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {review.description}
            </CardContent>
        </Card>
    )
}