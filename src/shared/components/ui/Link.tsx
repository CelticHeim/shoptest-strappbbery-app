import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ to, children, className = '', ...props }: LinkProps) {
  return (
    <RouterLink
      to={to}
      className={`text-primary hover:text-primary/80 transition font-medium ${className}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
