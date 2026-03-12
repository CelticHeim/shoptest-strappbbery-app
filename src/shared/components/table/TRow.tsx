import { ReactNode } from 'react';

interface TRowProps {
  children: ReactNode;
  className?: string;
}

export function TRow({ children, className = '' }: TRowProps) {
  return (
    <tr className={`hover:bg-gray-50 transition ${className}`}>
      {children}
    </tr>
  );
}
