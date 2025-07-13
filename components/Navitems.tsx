'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My journey', href: '/my-journey' }, // Fixed: Added leading slash
]

const Navitems = () => {
    const pathname = usePathname();

    return (
        <nav className='flex items-center gap-4'>
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        pathname === href && "text-primary font-bold" // Active styles - fixed class names
                    )}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default Navitems
