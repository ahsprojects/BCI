import React from 'react';
import AuthLayout from '@/app/components/common/auth-layout';
import Features from '@/app/components/features';
import LoginForm from '@/app/components/forms/login-form';

const Page = () => {
  return (
    <main className="flex flex-col">
      <section className="w-full bg-white p-5 max-md:max-w-full">
        <div className="flex flex-col lg:flex-row">
          <AuthLayout />
          <div className="flex flex-col flex-1 w-full">
            <LoginForm />
          </div>
        </div>
      </section>
      <div className='lg:hidden mt-8' >
        <Features />
      </div>
    </main>
  );
};

export default Page;