'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Trophy, Target, Home } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8" />
              <span className="text-xl font-bold">SinucaLabs</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Início</span>
                </Link>
                
                <Link
                  href="/matches"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Target className="h-4 w-4" />
                  <span>Partidas</span>
                </Link>
                
                <Link
                  href="/championships"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Trophy className="h-4 w-4" />
                  <span>Campeonatos</span>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.username}</span>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium hover:bg-green-500 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}