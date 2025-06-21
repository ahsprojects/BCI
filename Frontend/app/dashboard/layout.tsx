'use client';
import "../globals.css";
import Sidebar from '../components/sidebar';
import AccountDropdown from '../components/account-dropdown';


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <body>
            <main>
            <div className='flex flex-col lg:flex-row'>
                <Sidebar />
                <div className='flex-1 flex flex-col pl-5 pr-5 pt-5 lg:pl-8 pr-8 pt-8'>
                    <div className='hidden lg:block self-end' >
                        <AccountDropdown />
                    </div>
                    <div className='mt-4 lg:mt-0' >
                        {children}
                    </div>
                </div>
            </div>
        </main>
        </body>
    );
}
