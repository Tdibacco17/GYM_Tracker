'use client'
import Link from "next/link";
import { PersonIcon, FileTextIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppAdminLayout({ children }: { children: React.ReactNode; }) {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const pathname = usePathname()
    const isProfile = pathname === "/dashboard"
    const isRoutines = pathname === "/dashboard/routines"

    useEffect(() => {
        let lastScrollY = 0;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }
            lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main className="h-full w-full flex flex-col relative">
            <div className="pt-4 pb-[7.5rem] w-full h-full">
                {children}
            </div>
            <section
                className={`fixed bottom-0 bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40 h-14 w-full flex justify-between items-center border-t transition-transform duration-300 ${scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'}`}>
                <Link href={'/dashboard'} className="w-full flex justify-center items-center pointer-events-auto h-full">
                    <PersonIcon className="h-6 w-6" color={isProfile ? "#9162c0" : "#ffffff"} />
                </Link>
                <div className="w-[1px] h-full bg-border" />
                <Link href={'/dashboard/routines'} className="w-full flex justify-center items-center pointer-events-auto h-full">
                    <FileTextIcon className="h-6 w-6" color={isRoutines ? "#9162c0" : "#ffffff"} />
                </Link>
            </section>
        </main>
    )
}