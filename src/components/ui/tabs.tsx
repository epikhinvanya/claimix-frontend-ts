import React, { ReactNode, useState } from 'react';

type TabsProps = {
  defaultValue: string;
  children: ReactNode;
};

export function Tabs({ defaultValue, children }: TabsProps) {
  const [active, setActive] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child: any) => {
        if (child.type.name === 'TabsList') {
          return React.cloneElement(child, { active, setActive });
        }
        if (child.type.name === 'TabsContent') {
          return React.cloneElement(child, { active });
        }
        return null;
      })}
    </div>
  );
}

type TabsListProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  active: string;
  setActive: (value: string) => void;
};

export function TabsList({ children, active, setActive, className = '', ...rest }: TabsListProps) {
  return (
    <div className={`flex space-x-2 ${className}`} {...rest}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          isActive: active === child.props.value,
          onSelect: () => setActive(child.props.value),
        })
      )}
    </div>
  );
}

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
};

export function TabsTrigger({ children, isActive, onSelect }: TabsTriggerProps) {
  return (
    <button
      onClick={onSelect}
      className={`px-4 py-2 rounded-md text-sm ${
        isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  active?: string;
  children: ReactNode;
};

export function TabsContent({ value, active, children }: TabsContentProps) {
  if (value !== active) return null;
  return <div>{children}</div>;
}
