import { AppRoutes } from '@/app/routes';
import { ArrowUturnRightIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';


const AccountDropdown = () => {
    const [accountDropdown, setAccountDropdown] = useState<boolean | null>(false);
    const router = useRouter();
    const handleLogout = async () => {
        const response = await fetch("http://localhost:8000/users/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const data = await response.json();
        if (data.status == "success") {
            router.push(AppRoutes.LOGIN);
        }
    }
    return (
        <div className='relative'>
            <button onClick={() => setAccountDropdown(!accountDropdown)} className='bg-white lg:bg-neutral-100 hover:bg-neutral-200 p-2 rounded-full'>
                <UserCircleIcon className='size-5' />
            </button>
            {accountDropdown && (
                <div className='absolute bottom-0 right-0 translate-y-full' >
                    <div className='flex flex-col gap-1 divide-y text-sm font-medium bg-white w-52 shadow-md border border-gray-200 rounded-lg py-1 overflow-hidden' >
                        <Link href={AppRoutes.DASHBOARD} className='flex items-center gap-2 px-4 py-2 hover:bg-neutral-100' >
                            <ArrowUturnRightIcon className='size-5' />
                            <span>Dashboard</span>
                        </Link>
                        <button className='flex text-red-500 items-center gap-2 px-4 py-2 hover:bg-neutral-100' onClick={handleLogout} >
                            <ArrowLeftCircleIcon className='size-5' />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountDropdown
