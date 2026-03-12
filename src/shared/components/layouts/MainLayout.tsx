import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static w-64 h-screen bg-primary text-white transition-transform duration-300 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
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
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
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
            <img
              src="/strappberry-logo.png"
              alt="strAPPberry"
              className="h-8 w-auto sm:hidden"
            />
            <div className="hidden sm:block">
              <h2 className="text-xl font-semibold text-primary">Ordine App</h2>
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