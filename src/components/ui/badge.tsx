import { HTMLAttributes } from 'react';

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-block rounded-full bg-gray-200 px-3 py-1 text-xs text-black ${className}`}
      {...props}
    />
  );
}
