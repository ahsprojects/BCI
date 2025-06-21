'use client';
import React, { useEffect } from 'react';
import AuthLayout from '@/app/components/common/auth-layout';
import Features from '@/app/components/features';
import ForgetPasswordForm from '@/app/components/forms/forget-password-form';
import OTPForm from '@/app/components/forms/otp-form';
import { useState } from 'react';
import ChangePasswordForm from '@/app/components/forms/change-password-form';

const Page = () => {

  const [email, setEmailParent] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [validOtp, setValidOtp] = useState(false);




  return (
    <main className="flex flex-col">
      <section className="w-full bg-white p-5 max-md:max-w-full">
        <div className="flex flex-col lg:flex-row">
          <AuthLayout />
          <div className="flex flex-col flex-1 w-full" id="forget-password-form" style={{display: !otpSent  ? 'flex' : 'none'}}>
            <ForgetPasswordForm  setEmailParent={setEmailParent} setOtpSent={setOtpSent}  />
          </div>
          <div className="flex flex-col flex-1 w-full" id="otp-form" style={{display: otpSent && !validOtp ? 'flex' : 'none'}}>
            <OTPForm email={email} setValidOtp={setValidOtp} />
          </div>
          <div className="flex flex-col flex-1 w-full" id="change-password-form" style={{display: validOtp ? 'flex' : 'none'}}>
            <ChangePasswordForm email={email} />
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