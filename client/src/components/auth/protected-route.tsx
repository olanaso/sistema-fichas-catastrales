"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredAuthorities?: string[];
  fallback?: React.ReactNode;
  checkAccountStatus?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredAuthorities = [],
  fallback = null,
  checkAccountStatus = true,
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    hasAnyRole, 
    hasAnyAuthority,
    isAccountEnabled,
    isAccountNonLocked,
    isCredentialsNonExpired,
    isAccountNonExpired
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no está autenticado, mostrar fallback o redirigir
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Verificar estado de la cuenta si está habilitado
  if (checkAccountStatus) {
    if (!isAccountEnabled()) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Cuenta Deshabilitada
            </h1>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha sido deshabilitada. Contacta al administrador.
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Login
            </button>
          </div>
        </div>
      );
    }

    if (!isAccountNonLocked()) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Cuenta Bloqueada
            </h1>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha sido bloqueada. Contacta al administrador.
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Login
            </button>
          </div>
        </div>
      );
    }

    if (!isCredentialsNonExpired()) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Credenciales Expiradas
            </h1>
            <p className="text-gray-600 mb-4">
              Tus credenciales han expirado. Debes cambiar tu contraseña.
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Login
            </button>
          </div>
        </div>
      );
    }

    if (!isAccountNonExpired()) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Cuenta Expirada
            </h1>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha expirado. Contacta al administrador.
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Login
            </button>
          </div>
        </div>
      );
    }
  }

  // Si se requieren roles específicos, verificar permisos
  if (requiredRoles.length > 0) {
    const hasRequiredRole = hasAnyRole(requiredRoles);
    
    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-gray-600 mb-4">
              No tienes los roles necesarios para acceder a esta página.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      );
    }
  }

  // Si se requieren autoridades específicas, verificar permisos
  if (requiredAuthorities.length > 0) {
    const hasRequiredAuthority = hasAnyAuthority(requiredAuthorities);
    
    if (!hasRequiredAuthority) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-gray-600 mb-4">
              No tienes las autoridades necesarias para acceder a esta página.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}; 