import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartSafe } from '@/shared/context/CartContext';
import { CartDropdown } from '@/features/shopping/components/CartDropdown';
import type { User } from '@/shared/types/entities/User';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCartSafe();
  const user = localStorage.getItem('user');
  const userData: User | null = user ? JSON.parse(user) : null;

  const isAdmin = userData?.role === 'admin';
  const isCustomer = userData?.role === 'customer';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-64 h-screen bg-primary text-white transition-transform duration-300 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          }`}
      >
        <div className="p-6 border-b border-primary-dark">
          <img
            src="/strappberry-logo.png"
            alt="strAPPberry"
            className="h-8 w-auto"
          />
        </div>
        <nav className="px-3 py-4">
          {isCustomer && (
            <>
              <Link
                to="/shop"
                className="block px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={() => setSidebarOpen(false)}
              >
                Tienda
              </Link>
              <Link
                to="/purchases"
                className="block px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={() => setSidebarOpen(false)}
              >
                Mis Compras
              </Link>
              <Link
                to="/transactions"
                className="block px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={() => setSidebarOpen(false)}
              >
                Transacciones MP
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link
                to="/products"
                className="block px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={() => setSidebarOpen(false)}
              >
                Productos
              </Link>
              <Link
                to="/products/create"
                className="block px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={() => setSidebarOpen(false)}
              >
                Crear Producto
              </Link>
            </>
          )}
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t border-primary-dark">
          <div className="mb-4">
            <p className="text-sm text-white/80">Conectado como:</p>
            <p className="font-semibold truncate">{userData?.name || 'Usuario'}</p>
            <p className="text-xs text-white/60 truncate">{userData?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-status-danger hover:bg-red-700 text-white rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sm:ml-64 overflow-visible">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 overflow-visible">
          <div className="px-4 sm:px-6 py-4 flex items-center w-full">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden p-2 text-primary hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Right Side: User Name + Cart */}
            <div className="flex items-center gap-6 ml-auto">
              {/* User Name */}
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-text-primary">
                  {userData?.name || 'Usuario'}
                </p>
                <p className="text-xs text-text-secondary">{userData?.email}</p>
              </div>

              {/* Cart Button with Badge - Only for customers */}
              {isCustomer && (
                <div className="relative">
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative p-2 text-primary hover:bg-gray-100 rounded-lg transition"
                    title="Mi carrito"
                    data-cart-button
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {getTotalItems() > 0 && (
                      <span className="absolute top-0 right-0 bg-status-danger text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </button>

                  {/* Cart Dropdown - positioned to the right */}
                  {isCartOpen && (
                    <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}