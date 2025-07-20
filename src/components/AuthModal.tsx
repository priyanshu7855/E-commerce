import React, { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { state, login, register, clearError } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let success = false;
      if (isLogin) {
        success = await login({ email: formData.email, password: formData.password });
      } else {
        success = await register({ 
          email: formData.email, 
          password: formData.password, 
          name: formData.name 
        });
      }
      
      if (success) {
        onClose();
        setFormData({ email: '', password: '', name: '' });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (state.error) {
      clearError();
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{state.error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              {state.isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleModeSwitch}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm font-medium mb-1">Demo Credentials:</p>
              <p className="text-blue-700 text-xs">Email: admin@example.com</p>
              <p className="text-blue-700 text-xs">Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}