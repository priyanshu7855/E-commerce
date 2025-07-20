import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleAuthAction = () => {
    if (authState.isAuthenticated) {
      logout();
      setIsMobileMenuOpen(false);
    } else {
      setIsAuthModalOpen(true);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">EliteStore</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleAuthAction}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">
                  {authState.isAuthenticated ? `Hi, ${authState.user?.name}` : 'Login'}
                </span>
              </button>

              {authState.isAuthenticated && (
                <button
                  onClick={() => logout()}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm font-medium">Cart</span>
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleAuthAction}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span>{authState.isAuthenticated ? `Hi, ${authState.user?.name}` : 'Login'}</span>
                </button>

                {authState.isAuthenticated && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <span>Logout</span>
                  </button>
                )}

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Cart ({cartState.itemCount})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}