import { ReactNode } from 'react';

interface TCellProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  isHeader?: boolean;
}

export function TCell({
  children,
  className = '',
  align = 'left',
  isHeader = false,
}: TCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const Element = isHeader ? 'th' : 'td';

  return (
    <Element
      className={`px-6 py-4 whitespace-nowrap ${alignClass} ${
        isHeader ? 'font-semibold text-white' : 'text-text-primary'
      } ${className}`}
    >
      {children}
    </Element>
  );
}
