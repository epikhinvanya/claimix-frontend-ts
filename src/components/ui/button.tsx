import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
      bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ${className}`}
      {...props}
    />
  );
}
