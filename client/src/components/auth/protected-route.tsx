"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { AuthService } from '@/modules/auth/services/auth.service';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAccess?: 'total' | 'limited' | 'any';
  allowedViews?: string[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredAccess = 'any',
  allowedViews = [],
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasTotalAccess, canAccessView } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoading) return;

      // Si no está autenticado, redirigir al login
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      // Si no hay usuario, redirigir al login
      if (!user) {
        AuthService.logout();
        router.push('/auth/login');
        return;
      }

      // Verificar acceso según el tipo requerido
      let hasAccess = false;

      switch (requiredAccess) {
        case 'total':
          hasAccess = hasTotalAccess();
          break;
        case 'limited':
          hasAccess = !hasTotalAccess(); // Acceso limitado = no acceso total
          break;
        case 'any':
        default:
          hasAccess = true; // Cualquier usuario autenticado
          break;
      }

      // Si se especificaron vistas permitidas, verificar acceso a ellas
      if (allowedViews.length > 0) {
        const currentView = pathname.replace('/', '');
        hasAccess = canAccessView(currentView);
      }

      if (!hasAccess) {
        // Redirigir a dashboard si no tiene acceso
        router.push('/dashboard');
        return;
      }

      setIsChecking(false);
    };

    checkAccess();
  }, [isAuthenticated, isLoading, user, hasTotalAccess, canAccessView, requiredAccess, allowedViews, pathname, router]);

  // Mostrar loading mientras se verifica
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se redirigió)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Si se especificó un fallback y no tiene acceso, mostrarlo
  if (fallback && allowedViews.length > 0) {
    const currentView = pathname.replace('/', '');
    if (!canAccessView(currentView)) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// Componente de alto orden para proteger páginas
export function withAccessControl<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredAccess?: 'total' | 'limited' | 'any';
    allowedViews?: string[];
    fallback?: React.ReactNode;
  } = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Hook para verificar acceso en componentes
export function useAccessControl() {
  const { hasTotalAccess, hasLimitedAccess, canAccessView, canAccessAnyView, canAccessAllViews } = useAuth();

  return {
    hasTotalAccess,
    hasLimitedAccess,
    canAccessView,
    canAccessAnyView,
    canAccessAllViews,
    // Funciones de conveniencia
    isAdmin: hasTotalAccess,
    isUser: hasLimitedAccess,
    canAccess: canAccessView,
    canAccessAny: canAccessAnyView,
    canAccessAll: canAccessAllViews,
  };
} 