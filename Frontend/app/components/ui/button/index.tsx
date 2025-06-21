import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`${rest.className} hover:bg-cyan-800 duration-200 transition-all ease-in-out px-16 py-3 font-medium text-white bg-secondary rounded-xl`}
    >
      {children}
    </button>
  );
};

export default Button;
