import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '@/modules/auth/services/auth.service';
import { UsuarioDto, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/models/usuario';

interface AuthState {
  user: UsuarioDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Inicializar estado de autenticación solo en el cliente
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuthenticated = AuthService.isAuthenticated();
        const user = AuthService.getCurrentUser();
        
        setAuthState({
          user,
          isAuthenticated,
          isLoading: false,
        });
      } catch (error) {
        // Si hay error (por ejemplo, localStorage no disponible), establecer como no autenticado
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      initializeAuth();
    } else {
      // En el servidor, establecer como no autenticado
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Login
  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await AuthService.login(credentials);
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: response.success, data: response.data, message: response.message };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: error.message };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    AuthService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  // Forgot Password
  const forgotPassword = useCallback(async (data: ForgotPasswordRequest) => {
    try {
      const response = await AuthService.forgotPassword(data);
      return { success: response.success, data: response, message: response.message };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  // Reset Password
  const resetPassword = useCallback(async (data: ResetPasswordRequest) => {
    try {
      const response = await AuthService.resetPassword(data);
      return { success: response.success, data: response, message: response.message };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  // Verificar roles
  const hasRole = useCallback((roleCode: string) => {
    return AuthService.hasRole(roleCode);
  }, []);

  const hasAnyRole = useCallback((roleCodes: string[]) => {
    return AuthService.hasAnyRole(roleCodes);
  }, []);

  // Verificar autoridades (Spring Security)
  const hasAuthority = useCallback((authority: string) => {
    return AuthService.hasAuthority(authority);
  }, []);

  const hasAnyAuthority = useCallback((authorities: string[]) => {
    return AuthService.hasAnyAuthority(authorities);
  }, []);

  // Verificar estado de la cuenta
  const isAccountEnabled = useCallback(() => {
    return AuthService.isAccountEnabled();
  }, []);

  const isAccountNonLocked = useCallback(() => {
    return AuthService.isAccountNonLocked();
  }, []);

  const isCredentialsNonExpired = useCallback(() => {
    return AuthService.isCredentialsNonExpired();
  }, []);

  const isAccountNonExpired = useCallback(() => {
    return AuthService.isAccountNonExpired();
  }, []);

  return {
    ...authState,
    login,
    logout,
    forgotPassword,
    resetPassword,
    hasRole,
    hasAnyRole,
    hasAuthority,
    hasAnyAuthority,
    isAccountEnabled,
    isAccountNonLocked,
    isCredentialsNonExpired,
    isAccountNonExpired,
  };
}; 