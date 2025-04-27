import { ReactNode } from 'react';

export function Select({ children, onValueChange, defaultValue }: any) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onValueChange(e.target.value)}
      className="rounded-md border px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value}>{children}</option>;
}
