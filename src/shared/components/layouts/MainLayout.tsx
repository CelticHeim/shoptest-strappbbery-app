import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white">
        <div className="p-6">
          {/* Logo/Brand area */}
        </div>
        <nav className="px-3 py-4">
          {/* Navigation items */}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          {/* Logout area */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            {/* Header content */}
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
