"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AuthService } from '@/modules/auth/services/auth.service';

export const DebugAuth = () => {
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Solo acceder a localStorage después de que el componente se haya montado
    setToken(AuthService.getToken());
    setUser(AuthService.getCurrentUser());
  }, []);

  // No renderizar nada hasta que el componente se haya montado
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Auth State:</h3>
      <div className="space-y-1">
        <div>isLoading: {auth.isLoading.toString()}</div>
        <div>isAuthenticated: {auth.isAuthenticated.toString()}</div>
        <div>hasToken: {!!token}</div>
        <div>hasUser: {!!user}</div>
        {user && (
          <>
            <div>User: {user.nombres} {user.apellidos}</div>
            <div>Email: {user.email}</div>
            <div>Roles: {user.rol?.map((r: any) => r.codigo).join(', ')}</div>
          </>
        )}
        {token && (
          <div>Token: {token.substring(0, 20)}...</div>
        )}
      </div>
    </div>
  );
}; 