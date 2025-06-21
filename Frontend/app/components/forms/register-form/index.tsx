'use client';
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Input from '../../ui/input';
import Button from '../../ui/button';
import Link from 'next/link';
import { AppRoutes } from '@/app/routes';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFieldType, setPasswordFieldType] = useState<string>('password');
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('');
  const router = useRouter();

  const handleSeePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email || !password || !age || !gender) {
      setError('Please fill in all the fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if(age < 18) {
      setError('You must be at least 18 years old to register.');
      return;
    }

    if (!checked) {
      setCheckError('Please agree to the terms and conditions.');
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

    const response = await fetch('http://localhost:8000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, age, gender }),
      credentials: 'include',
    });

    const data = await response.json();

    if (data["status"] === "error") {
      setError(data["message"]);
      return;
    }else{
      setError(null);
      setCheckError(null);
      router.push(AppRoutes.DASHBOARD);
    }
  };

  return (
    <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
      <div>
        <h2 className="self-start text-2xl lg:text-3xl font-bold text-black">Register</h2>
        <p className="self-start mt-2 leading-6 text-zinc-500">
          Create an account by entering an email and password.
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
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="password" className="self-start font-semibold leading-6 text-black">
          Password
        </label>
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

      <div className="mt-4 flex gap-5">
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="age" className="self-start font-semibold leading-6 text-black">
            Age
          </label>
          <Input
            type="number"
            value={age}
            onChange={(e: any) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="gender" className="self-start font-semibold leading-6 text-black">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e: any) => setGender(e.target.value)}
            required
            className="border border-neutral-200 rounded-md px-4 py-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

      <div className="flex gap-3 mt-10 font-medium leading-6">
        <input
          type="checkbox"
          id="terms"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md accent-secondary"
        />
        <label htmlFor="terms" className="-mt-0.5 text-sm flex-auto max-md:max-w-full text-zinc-500">
          By registering, you agree to our terms and conditions and acknowledge the safe use of our brain-computer interface technology.
        </label>
      </div>

      {checkError && <div className="text-red-600 text-sm mt-2">{checkError}</div>}

      <div className="mt-10 lg:mt-16">
        <Button type="button" className="w-full" onClick={handleRegister}>
          Register
        </Button>
      </div>

      <div className="flex gap-2 self-center mt-5 max-w-full leading-6">
        <p className="shrink-0 text-right text-zinc-600">Already have an account?</p>
        <Link href={AppRoutes.LOGIN} className="font-semibold text-primary underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
