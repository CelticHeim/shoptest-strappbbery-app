import { ReactNode } from 'react';

interface TBodyProps {
  children: ReactNode;
}

export function TBody({ children }: TBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200">
      {children}
    </tbody>
  );
}
