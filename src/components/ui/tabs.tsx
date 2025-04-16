import { ReactNode, useState } from 'react';
import React from 'react';


export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div>
      {Array.isArray(children) &&
        children.map((child: any) =>
          child.type.name === 'TabsList'
            ? React.cloneElement(child, { active, setActive })
            : child.type.name === 'TabsContent' && child.props.value === active
            ? child
            : null
        )}
    </div>
  );
}
export function TabsList({ children, active, setActive }: any) {
  return (
    <div className="flex space-x-2 mb-4">
      {children.map((child: any) =>
        React.cloneElement(child, {
          isActive: active === child.props.value,
          onSelect: () => setActive(child.props.value),
        })
      )}
    </div>
  );
}
export function TabsTrigger({ value, children, isActive, onSelect }: any) {
  return (
    <button
      onClick={onSelect}
      className={`px-4 py-2 rounded-md text-sm ${isActive ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
