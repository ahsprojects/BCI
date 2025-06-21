import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ placeholder, className, type = 'text', onChange, ...rest }: InputProps) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} px-4 py-2 leading-6 rounded-md border border-solid border-neutral-200 text-zinc-700 max-md:pr-5 max-md:max-w-full`}
      {...rest}
    />
  );
};

export default Input;
