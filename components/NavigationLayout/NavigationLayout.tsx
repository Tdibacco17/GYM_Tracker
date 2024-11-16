'use client'
import { useEffect, useState } from "react";

export default function NavigationLayout({ children }: { children: React.ReactNode; }) {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

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
        <section className={`fixed bottom-0 bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40 h-14 w-full flex justify-between items-center border-t transition-transform duration-300 ${scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'}`}>
            {children}
        </section>
    )
}