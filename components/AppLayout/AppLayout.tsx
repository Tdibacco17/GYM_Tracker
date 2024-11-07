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
            <div className="w-full h-full overflow-hidden px-4 pt-4 flex justify-center">
                <div className="h-full overflow-y-scroll no-scrollbar pb-4 w-full">
                    {children}
                </div>
            </div>
            <section className="h-14 w-full flex justify-between items-center border-t">
                <Link href={'/'} className="w-full flex justify-center items-center">
                    <PersonIcon className="h-6 w-6" color={isProfile ? "#52A8FF" : "#ffffff"} />
                </Link>
                <div className="w-[1px] h-full bg-border" />
                <Link href={'/routines'} className="w-full flex justify-center items-center">
                    <FileTextIcon className="h-6 w-6" color={isRoutines ? "#52A8FF" : "#ffffff"}/>
                </Link>
            </section>
        </main>
    )
}