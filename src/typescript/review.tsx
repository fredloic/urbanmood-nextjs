export type Review = {
    reviewId: number;
    description: string;
    star: number;
    username: string | null;
    userId: string | null;
}