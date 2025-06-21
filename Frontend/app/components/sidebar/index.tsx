"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/assets/images/bci-logo.svg';
import { Bars2Icon, ChatBubbleBottomCenterIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { AppRoutes } from '@/app/routes';
import { usePathname } from 'next/navigation';
import AccountDropdown from '../account-dropdown';

const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const pathname = usePathname();
    const [scrollDirection, setScrollDirection] = useState<string>('up');

    const menuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef<number>(0);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current) {
            setScrollDirection('up');
        }

        if (currentScrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }

        lastScrollY.current = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const navLinks = [
        {
            link: 'Chat',
            icon: <ChatBubbleBottomCenterIcon className='size-5' />,
            href: AppRoutes.DASHBOARD,
        },
        {
            link: 'Model Training',
            icon: <CpuChipIcon className='size-5' />,
            href: AppRoutes.MODEL_TRAINING,
        },
    ]

    return (
        <div className="bg-neutral-100 lg:min-h-screen p-3 lg:p-8">
            <div>
                <div>
                    <div className='flex items-center justify-between' >
                        <Link className="flex text-xl font-black items-center" href="/">
                            <Image src={Logo} alt='logo' className='w-56 lg:w-60' />
                        </Link>
                       <div className='flex lg:hidden items-center gap-3' >
                            <AccountDropdown />
                            <button className='hover:opacity-70 bg-white p-2 rounded-full' onClick={() => setMenuOpen(!menuOpen)}>
                                <Bars2Icon className='size-5' />
                            </button>
                       </div>
                    </div>
                   <div className='mt-8 hidden lg:block' >
                        <h1 className='text-sm font-semibold'>Navigation</h1>
                        <div className='mt-5 flex flex-col gap-2'>
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.link} 
                                    href={link.href} 
                                    className={`${pathname === link.href && 'bg-primary/10 text-primary'} font-medium px-4 py-2 flex items-center gap-3 rounded-lg hover:bg-primary/10 hover:text-primary duration-200 transition-all`}
                                >
                                    {link.icon}
                                    {link.link}
                                </Link>
                            ))}
                        </div>
                   </div>
                </div>
            </div>
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    ref={menuRef}
                    className={`fixed left-0 top-0 w-full max-w-72 p-6 bg-white h-full transition-transform duration-300 ${menuOpen ? '-translate-x-0' : '-translate-x-full'}`}
                >
                    <div>
                        <Link className="flex text-xl font-black items-center" href="/">
                            <Image src={Logo} alt='logo' className='w-60' />
                        </Link>
                    </div>
                    <div className='mt-5 flex flex-col gap-2'>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.link} 
                                href={link.href} 
                                className={`${pathname === link.href && 'bg-primary/10 text-primary'} font-medium px-4 py-2 flex items-center gap-3 rounded-lg hover:bg-primary/10 hover:text-primary duration-200 transition-all`}
                            >
                                {link.icon}
                                {link.link}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
