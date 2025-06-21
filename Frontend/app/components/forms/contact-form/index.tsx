'use client';
import React, { useState } from 'react';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useRouter } from 'next/navigation';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');
    const router = useRouter();


    return (
        <form className="flex flex-col self-stretch my-auto w-full max-md:mt-10 text-sm max-w-lg mx-auto">
            <div>
                <h1 className="self-start text-2xl lg:text-3xl font-bold text-black">Contact Us</h1>
                <p className="self-start mt-2 leading-6 text-zinc-500">
                    Please fill out the form below and we will get back to you as soon as possible.
                </p>
            </div>
            <div className="mt-9 flex flex-col gap-1">
                    <label htmlFor="name" className="self-start font-semibold leading-6 text-black">
                        Name
                    </label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder="Enter your name"
                        id="name"
                        required
                    />
                </div>

            <div className="mt-4 flex flex-col gap-1">
                <label htmlFor="email" className="self-start font-semibold leading-6 text-black">
                    Email
                </label>
                <Input
                    onChange={(e: any) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    id='email'
                />
            </div>

            <div className="mt-4 flex flex-col gap-1">
                <label htmlFor="message" className="self-start font-semibold leading-6 text-black">
                    Message
                </label>
                <textarea
                    className="w-full h-32 p-4 text-sm text-zinc-500 bg-zinc-100 border border-zinc-200 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                    id="message"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    name="message"
                    placeholder="Enter your message"
                    required
                />
            </div>
            <div className="mt-10 lg:mt-16">
                <Button type="button" className="w-full">
                    Submit
                </Button>
            </div>

        </form>
    );
};

export default ContactForm;
