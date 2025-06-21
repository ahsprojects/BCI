'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/images/bci-logo.svg";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { AppRoutes } from '@/app/routes';


const navigation = [
    { name: 'About Us', href: AppRoutes.ABOUT },
    { name: 'How it works?', href: AppRoutes.HOW_IT_WORKS },
    { name: 'Contact Us', href: AppRoutes.CONTACT },
]


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const checkLogin = async () => {
        try {
            const response = await fetch("http://localhost:8000/users/validate-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();
            setIsLoggedIn(data.status === "success");
        } catch (error) {
            console.error("Error checking login status:", error);
        } finally {
            setIsLoaded(true); // Ensure this is updated no matter what
        }
    };

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between py-6 px-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href={AppRoutes.HOME} className="-m-1.5 p-1.5">
                        <span className="sr-only">Brain Computer Interface</span>
                        <Image
                            alt=""
                            src={Logo}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex items-center gap-5 lg:flex-1 lg:justify-end">
                    {isLoaded ? (
                        isLoggedIn ? (
                            <Link href={AppRoutes.DASHBOARD} className="bg-secondary px-4 py-2 rounded-full font-medium text-white">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={AppRoutes.LOGIN} className="text-sm/6 font-semibold text-gray-900">
                                    Log in
                                </Link>
                                <Link href={AppRoutes.REGISTER} className="bg-secondary px-4 py-2 rounded-full font-medium text-white">
                                    Register
                                </Link>
                            </>
                        )
                    ) : (
                        // Optionally, you can add a placeholder or spinner here
                        <div className="animate-pulse px-4 py-2 text-gray-400">Loading...</div>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Brain Computer Interface</span>
                            <Image
                                alt=""
                                src={Logo}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {isLoaded ? (
                                    isLoggedIn ? (
                                        <Link href={AppRoutes.DASHBOARD} className="bg-secondary px-4 py-2 rounded-full font-medium text-white">
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={AppRoutes.LOGIN} className="text-sm/6 font-semibold text-gray-900">
                                                Log in
                                            </Link>
                                            <Link href={AppRoutes.REGISTER} className="bg-secondary px-4 py-2 rounded-full font-medium text-white">
                                                Register
                                            </Link>
                                        </>
                                    )
                                ) : (
                                    // Optionally, you can add a placeholder or spinner here
                                    <div className="animate-pulse px-4 py-2 text-gray-400">Loading...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}