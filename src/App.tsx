import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/shared/components/layouts';
import { MainLayout } from '@/shared/components/layouts';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

import { Login } from '@/features/auth/Login';
import { Register } from '@/features/auth/Register';

import { ProductList } from '@/features/products/ProductList';
import { ProductCreate } from '@/features/products/ProductCreate';
import { ProductEdit } from '@/features/products/ProductEdit';

import { Shopping } from '@/features/shopping/Shopping';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/shop" element={<Shopping />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
