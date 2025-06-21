'use client';
import React, { useState } from 'react';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/app/routes';

interface ForgetPasswordFormProps {
  setEmailParent: React.Dispatch<React.SetStateAction<string>>;
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ setEmailParent, setOtpSent }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    const response = await fetch("http://localhost:8000/users/send-otp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();

    if (data.status === 'error') {
      setError(data.message);
      return;
    }else{
      setEmailParent(email);
      setOtpSent(true);
      setError(null);
      setSuccessMessage('OTP has been sent to your email.');
      console.log('Reset link sent to:', email);
    }


    
  };

  return (
    <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
      <div>
        <h2 className="self-start text-2xl lg:text-3xl font-bold text-black">Forget Password</h2>
        <p className="self-start mt-2 leading-6 text-zinc-500">
            Enter your email to change your password via email.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-1">
        <label htmlFor="email" className="self-start font-semibold leading-6 text-black">
          Email
        </label>
        <Input
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {successMessage && <div className="text-green-600 text-sm mt-2">{successMessage}</div>}

      <div className="mt-10 lg:mt-16">
        <Button className='w-full' type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
