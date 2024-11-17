'use client'
import Link from "next/link";
import { PersonIcon, FileTextIcon, ValueNoneIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

export function NavigationClient({ linkText }: { linkText: string | null }) {
    const pathname = usePathname()
    const isProfile = pathname === "/dashboard"
    const isRoutines = pathname.startsWith("/dashboard/routines");

    return (
        <>
            <Link href={'/dashboard'} className="w-full flex justify-center items-center pointer-events-auto h-full">
                <PersonIcon className="h-6 w-6" color={isProfile ? "#9162c0" : "#ffffff"} />
            </Link>
            <div className="w-[1px] h-full bg-border" />
            {linkText ?
                <Link href={linkText} className="w-full flex justify-center items-center pointer-events-auto h-full">
                    <FileTextIcon className="h-6 w-6" color={isRoutines ? "#9162c0" : "#ffffff"} />
                </Link>
                : <p className="w-full flex justify-center items-center pointer-events-auto h-full text-muted-foreground">
                    <ValueNoneIcon className="h-6 w-6" color={"#a1a1a9"} />
                </p>
            }
        </>
    )
}