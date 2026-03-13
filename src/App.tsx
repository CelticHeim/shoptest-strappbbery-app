import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/shared/components/layouts';
import { MainLayout } from '@/shared/components/layouts';
import { AdminRoute } from '@/shared/components/AdminRoute';
import { CustomerRoute } from '@/shared/components/CustomerRoute';
import { CartProvider } from '@/shared/context/CartContext';
import { ToastProvider } from '@/shared/context/ToastContext';
import { ProductDetailProvider } from '@/shared/context/ProductDetailContext';
import { ToastContainer } from '@/shared/components/common/ToastContainer';

import { Login } from '@/features/Auth/Login';
import { Register } from '@/features/Auth/Register';

import { ProductList } from '@/features/Products/ProductList';
import { ProductCreate } from '@/features/Products/ProductCreate';
import { ProductEdit } from '@/features/Products/ProductEdit';

import { Shopping } from '@/features/Shopping/Shopping';
import { CheckoutIndex } from '@/features/Checkout';
import { PurchasesIndex } from '@/features/Purchases';
import { TransactionsIndex } from '@/features/Transactions';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes - Customer Routes */}
          <Route
            element={
              <CustomerRoute>
                <CartProvider>
                  <ProductDetailProvider>
                    <MainLayout />
                  </ProductDetailProvider>
                </CartProvider>
              </CustomerRoute>
            }
          >
            <Route path="/shop" element={<Shopping />} />
            <Route path="/checkout" element={<CheckoutIndex />} />
            <Route path="/purchases" element={<PurchasesIndex />} />
            <Route path="/transactions" element={<TransactionsIndex />} />
          </Route>

          {/* Protected Routes - Admin Routes */}
          <Route
            element={
              <AdminRoute>
                <ProductDetailProvider>
                  <MainLayout />
                </ProductDetailProvider>
              </AdminRoute>
            }
          >
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
