import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { User } from '@/shared/types/entities/User';

interface CustomerRouteProps {
  children: React.ReactNode;
}

export function CustomerRoute({ children }: CustomerRouteProps) {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    try {
      const user: User = JSON.parse(userStr);
      if (user.role === 'customer') {
        setIsValid(true);
      } else {
        // User is authenticated but not customer, redirect to products
        setRedirecting(true);
      }
    } catch {
      setIsValid(false);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (redirecting) {
    return <Navigate to="/products" replace />;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
