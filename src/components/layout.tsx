import { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-screen max-w-screen w-full bg-background text-foreground">
            <div className="mx-auto w-full px-5 py-4 flex flex-col gap-6">
                {children}
            </div>
        </div>
    );
};
