import React from 'react';
import BCILogo from '@/app/assets/images/bci-logo.svg'
import Image from 'next/image';
import Features from '../../features';

const AuthLayout = () => {
  return (
    <div className="flex flex-col flex-1 lg:flex-[0.7] max-md:ml-0">
        <div className="flex flex-col items-start mx-auto w-full rounded-xl lg:bg-neutral-100 lg:min-h-screen lg:p-10 max-md:max-w-full">
            <Image loading="lazy" src={BCILogo} alt='logo' className='w-72 lg:w-[unset]' />
            <h2 className="mt-10 text-3xl lg:text-5xl font-bold leading-[1.4] lg:leading-[1.3] text-primary lg:w-[300px]">
                Sync Your <span className='underline-primary' >Mind</span>, Control Your <span className='underline-primary' >World</span>.
            </h2>
          <div className='hidden lg:block mt-16' >
            <Features />
          </div>
        </div>
    </div>
  );
};

export default AuthLayout;