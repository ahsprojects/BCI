'use client';
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/app/routes';

interface ChangePasswordFormProps {
  email: string;
}

const ChangePasswordForm:React.FC<ChangePasswordFormProps> = ({email}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFieldType, setPasswordFieldType] = useState<string>('password');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSeePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must contain at least one number and one uppercase letter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const response = await fetch("http://localhost:8000/users/reset-password", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: newPassword }),
    });

    const data = await response.json();

    if (data.status === 'error') {
      setError(data.message);
      return;
    } else {
      setError(null);
      setSuccessMessage('Password has been changed successfully.');
      console.log('Password changed successfully');
    }


  };

  return (
    <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
      <div>
        <h2 className="self-start text-2xl lg:text-3xl font-bold text-black">Change Password</h2>
        <p className="self-start mt-2 leading-6 text-zinc-500">
          Enter your new password below.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-1">
        <label htmlFor="newPassword" className="self-start font-semibold leading-6 text-black">
          New Password
        </label>
        <div className="flex gap-5 justify-between pr-4 leading-6 rounded-md border border-solid border-neutral-200 text-zinc-400 max-md:max-w-full">
          <Input
            onChange={(e: any) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="bg-transparent border-none outline-none w-full"
            type={passwordFieldType}
            required
          />
          <button onClick={handleSeePassword}>
            <EyeIcon className="text-zinc-500 size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="self-start font-semibold leading-6 text-black">
          Confirm New Password
        </label>
        <div className="flex gap-5 justify-between pr-4 leading-6 rounded-md border border-solid border-neutral-200 text-zinc-400 max-md:max-w-full">
          <Input
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="bg-transparent border-none outline-none w-full"
            type={passwordFieldType}
            required
          />
          <button onClick={handleSeePassword}>
            <EyeIcon className="text-zinc-500 size-4" />
          </button>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {successMessage && <div className="text-green-600 text-sm mt-2">{successMessage}</div>}

      <div className="mt-10 lg:mt-16">
        <Button className='w-full' type="button" onClick={handleSubmit}>
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
