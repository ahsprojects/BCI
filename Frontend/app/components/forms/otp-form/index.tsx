'use client';
import React, { useState } from 'react';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useRouter } from 'next/navigation';

interface OTPFormProps {
  email: string;
  setValidOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPForm:React.FC<OTPFormProps> = ({email,setValidOtp}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid OTP.');
      return;
    }

    const response = await fetch("http://localhost:8000/users/validate-otp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (data.status === 'error') {
      setError(data.message);
      return;
    } else {
      setValidOtp(true);
      setError(null);
      setSuccessMessage('OTP has been verified.');
      console.log('OTP verified');
    }

  };

  return (
    <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
      <div>
        <h2 className="self-start text-2xl lg:text-3xl font-bold text-black">Forget Password</h2>
        <p className="self-start mt-2 leading-6 text-zinc-500">
            Enter OTP sent to your email to change your password.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-1">
        <label htmlFor="email" className="self-start font-semibold leading-6 text-black">
          OTP
        </label>
        <Input
          onChange={(e: any) => setOtp(e.target.value)}
          placeholder="Enter OTP sent to your email"
          type="number"
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

export default OTPForm;
