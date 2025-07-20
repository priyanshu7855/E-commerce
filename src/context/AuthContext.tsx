import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async ({ email, password }: LoginCredentials): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate different responses based on email
      if (email === 'admin@example.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          email,
          name: 'Admin User',
        };
        
        setState({ user, isAuthenticated: true, isLoading: false, error: null });
        return true;
      } else if (email.includes('@') && password.length >= 6) {
        const user: User = {
          id: '2',
          email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        };
        
        setState({ user, isAuthenticated: true, isLoading: false, error: null });
        return true;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return false;
    }
  };

  const register = async ({ email, password, name }: RegisterCredentials): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      // Simulate successful registration
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return false;
    }
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}