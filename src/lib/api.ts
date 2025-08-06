import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para enviar cookies
});

// Interceptor para lidar com respostas e renovar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Evitar loop infinito - não tentar renovar token para certas rotas
    const isAuthRoute = originalRequest.url?.includes('/api/accounts/login/') || 
                       originalRequest.url?.includes('/api/accounts/register/') ||
                       originalRequest.url?.includes('/api/accounts/token/refresh/');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;
      
      try {
        // Tentar renovar o token usando o refresh token do cookie
        await api.post('/api/accounts/token/refresh/');
        
        // Repetir a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        // Se falhar, não redirecionar automaticamente
        // Deixar o componente lidar com o erro
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;