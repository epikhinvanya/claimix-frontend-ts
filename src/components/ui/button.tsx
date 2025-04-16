import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
      bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 ${className}`}
      {...props}
    />
  );
}
