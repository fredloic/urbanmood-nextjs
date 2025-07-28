
import { HeaderServer } from "@/components/header-server";
import { PropsWithChildren } from "react";



export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <HeaderServer />
            {children}

        </>
    );
}
