'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthTokens, LoginCredentials, RegisterData } from '@/types';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Com cookies httpOnly, não precisamos verificar localStorage
      // O cookie será enviado automaticamente com withCredentials: true
      const response = await api.get('/api/accounts/profile/');
      setUser(response.data);
    } catch (error: any) {
      // Se falhar, o usuário não está autenticado
      setUser(null);
      // Não fazer log do erro se for 401 (usuário não autenticado)
      if (error.response?.status !== 401) {
        console.error('Erro ao verificar autenticação:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/api/accounts/login/', credentials);
      
      // Com cookies httpOnly, os tokens são definidos automaticamente pelo backend
      // Buscar dados do usuário
      const userResponse = await api.get('/api/accounts/profile/');
      setUser(userResponse.data.user || userResponse.data);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post('/api/accounts/register/', data);
      
      // Com cookies httpOnly, os tokens são definidos automaticamente pelo backend
      // Definir o usuário diretamente da resposta
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Chamar endpoint de logout para limpar cookies httpOnly
      await api.post('/api/accounts/logout/');
    } catch (error) {
      // Mesmo se falhar, limpar o estado local
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
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