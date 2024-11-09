'use client'
import Link from "next/link";
import { PersonIcon, FileTextIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode; }) {
    const pathname = usePathname()
    const isProfile = pathname === "" || pathname === "/"
    const isRoutines = pathname === "/routines"

    return (
        <main className="min-h-svh h-svh max-h-svh w-full flex flex-col relative">
            <div className="w-full h-full overflow-hidden pt-4 flex justify-center">
                <div className="h-full overflow-y-scroll no-scrollbar pb-[7.5rem] w-full">
                    {children}
                </div>
            </div>
            <section className="fixed bottom-0 bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40 h-14 w-full flex justify-between items-center border-t">
                <Link href={'/dashboard'} className="w-full flex justify-center items-center">
                    <PersonIcon className="h-6 w-6" color={isProfile ? "#9162c0" : "#ffffff"} />
                </Link>
                <div className="w-[1px] h-full bg-border" />
                <Link href={'/dashboard/routines'} className="w-full flex justify-center items-center">
                    <FileTextIcon className="h-6 w-6" color={isRoutines ? "#9162c0" : "#ffffff"} />
                </Link>
            </section>
        </main>
    )
}