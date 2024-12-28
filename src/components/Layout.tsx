import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Home, Receipt, Plus, Settings as SettingsIcon, List } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/add', icon: Plus, label: '' },
  { path: '/list', icon: List, label: 'Mes biens' },
];

export function Layout({ children }: LayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  
  const isPublicRoute = Boolean(
    matchPath("/", location.pathname) ||
    matchPath("/login", location.pathname) ||
    matchPath("/signup", location.pathname)
  );

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-brand-100 backdrop-blur-lg bg-opacity-50 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center h-16 px-4">
          <Link to="/" className="flex items-center">
            <Receipt className="h-6 w-6 text-brand-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Receptify
            </span>
          </Link>
          <div className="flex items-center">
            <Link
              to="/settings"
              className="p-2 text-gray-500 hover:text-brand-600 transition-colors"
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-20 pb-24 px-4 bg-gradient-to-br from-white to-brand-50">
        {children}
      </main>
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full ${item.path === '/add'
                  ? 'bg-brand-600 text-white -mt-8 rounded-full w-18 h-18 mx-auto shadow-lg'
                  : isActive ? 'text-brand-600' : 'text-gray-500'}`}
              >
                <Icon className={item.path === '/add' ? 'h-8 w-8 font-bold' : 'h-6 w-6'} />
                {item.label && <span className="text-xs mt-1">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}