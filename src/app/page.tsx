'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Trophy, Target, Clock, Award } from 'lucide-react';

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="mx-auto h-24 w-24 text-green-600" />
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              Bem-vindo ao SinucaLabs
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              A melhor plataforma para jogar sinuca online
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/register"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Começar Agora
              </a>
              <a
                href="/login"
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Fazer Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {user?.first_name || user?.username}!
          </h1>
          <p className="text-gray-600">Bem-vindo de volta ao SinucaLabs</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Partidas Jogadas</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vitórias</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tempo Jogado</p>
                <p className="text-2xl font-bold text-gray-900">0h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conquistas</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Nova Partida
              </button>
              <button className="w-full border border-green-600 text-green-600 py-3 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors">
                Buscar Oponente
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Campeonatos</h2>
            <p className="text-gray-600 mb-4">Nenhum campeonato ativo no momento.</p>
            <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Ver Todos os Campeonatos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
