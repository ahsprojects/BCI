'use client';
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Input from '../../ui/input';
import Button from '../../ui/button';
import Link from 'next/link';
import { AppRoutes } from '@/app/routes';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFieldType, setPasswordFieldType] = useState<string>('password');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSeePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one number and one uppercase letter.');
      return;
    }

    const response = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (data["status"] === "error") {
      setError(data["message"]);
      return;
    } else {
      setError(null);
      router.push(AppRoutes.DASHBOARD);
    }
  };

  return (
    <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
      <div>
        <h2 className="self-start text-2xl lg:text-3xl font-bold text-black">Login</h2>
        <p className="self-start mt-2 leading-6 text-zinc-500">
          Log in to your account by entering email and password.
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

      <div className="mt-4 flex flex-col gap-1">
        <div className='flex items-center justify-between' >
          <label htmlFor="password" className="self-start font-semibold leading-6 text-black">
            Password
          </label>
          <Link href={AppRoutes.FORGET_PASSWORD} className="font-semibold text-primary underline">
            Forgot your Password?
          </Link>
        </div>
        <div className="flex gap-5 justify-between pr-4 leading-6 rounded-md border border-solid border-neutral-200 text-zinc-400 max-md:max-w-full">
          <Input
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Enter your password"
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

      <div className="mt-10 lg:mt-16">
        <Button type="button" className='w-full' onClick={handleLogin}>
          Login
        </Button>
      </div>

      <div className="flex gap-2 self-center mt-5 max-w-full leading-6">
        <p className="shrink-0 text-right text-zinc-600">Don't have an account?</p>
        <Link href={AppRoutes.REGISTER} className="font-semibold text-primary underline">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
