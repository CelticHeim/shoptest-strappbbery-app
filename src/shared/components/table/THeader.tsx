import { ReactNode } from 'react';

interface THeaderProps {
  children: ReactNode;
}

export function THeader({ children }: THeaderProps) {
  return (
    <thead className="bg-primary text-white">
      {children}
    </thead>
  );
}
