import apiClient from '@/lib/axios';
import { config } from '@/lib/config';
import { 
  LoginRequest, 
  LoginResponse, 
  ForgotPasswordRequest, 
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UsuarioDto
} from '@/models/usuario';

// Función auxiliar para verificar si localStorage está disponible
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  } catch {
    return false;
  }
};

// Función auxiliar para obtener un item de localStorage de forma segura
const getLocalStorageItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Función auxiliar para establecer un item en localStorage de forma segura
const setLocalStorageItem = (key: string, value: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignorar errores de localStorage
  }
};

// Función auxiliar para remover un item de localStorage de forma segura
const removeLocalStorageItem = (key: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignorar errores de localStorage
  }
};

export class AuthService {
  // Login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { data } = response.data;
      
      // Guardar token y usuario en localStorage
      setLocalStorageItem(config.auth.tokenKey, data.accessToken);
      setLocalStorageItem(config.auth.userKey, JSON.stringify(data.user));
      
      // Guardar refresh token si es necesario
      if (data.refreshToken) {
        setLocalStorageItem('refresh_token', data.refreshToken);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  }

  // Logout
  static logout(): void {
    removeLocalStorageItem(config.auth.tokenKey);
    removeLocalStorageItem(config.auth.userKey);
    removeLocalStorageItem('refresh_token');
    
    if (typeof window !== 'undefined') {
      window.location.href = config.auth.loginUrl;
    }
  }

  // Forgot Password
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiClient.post('/auth/forgot-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al enviar el correo de recuperación');
    }
  }

  // Reset Password
  static async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const response = await apiClient.post('/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  }

  // Verificar si el usuario está autenticado
  static isAuthenticated(): boolean {
    const token = getLocalStorageItem(config.auth.tokenKey);
    return !!token;
  }

  // Obtener usuario actual
  static getCurrentUser(): UsuarioDto | null {
    const userStr = getLocalStorageItem(config.auth.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Obtener token actual
  static getToken(): string | null {
    return getLocalStorageItem(config.auth.tokenKey);
  }

  // Obtener refresh token
  static getRefreshToken(): string | null {
    return getLocalStorageItem('refresh_token');
  }

  // Verificar si el usuario tiene un rol específico
  static hasRole(roleCode: string): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.rol) return false;
    
    return user.rol.some(rol => rol.codigo === roleCode);
  }

  // Verificar si el usuario tiene cualquiera de los roles especificados
  static hasAnyRole(roleCodes: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.rol) return false;
    
    return user.rol.some(rol => roleCodes.includes(rol.codigo));
  }

  // Verificar si el usuario tiene una autoridad específica (Spring Security)
  static hasAuthority(authority: string): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.authorities) return false;
    
    return user.authorities.some(auth => auth.authority === authority);
  }

  // Verificar si el usuario tiene cualquiera de las autoridades especificadas
  static hasAnyAuthority(authorities: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.authorities) return false;
    
    return user.authorities.some(auth => authorities.includes(auth.authority));
  }

  // Verificar si la cuenta está habilitada
  static isAccountEnabled(): boolean {
    const user = this.getCurrentUser();
    return user ? user.enabled : false;
  }

  // Verificar si la cuenta no está bloqueada
  static isAccountNonLocked(): boolean {
    const user = this.getCurrentUser();
    return user ? user.accountNonLocked : false;
  }

  // Verificar si las credenciales no han expirado
  static isCredentialsNonExpired(): boolean {
    const user = this.getCurrentUser();
    return user ? user.credentialsNonExpired : false;
  }

  // Verificar si la cuenta no ha expirado
  static isAccountNonExpired(): boolean {
    const user = this.getCurrentUser();
    return user ? user.accountNonExpired : false;
  }

  // Actualizar perfil de usuario
  static async updateUserProfile(userId: string, profileData: Partial<UsuarioDto>): Promise<{ success: boolean; message: string; user?: UsuarioDto }> {
    try {
      const response = await apiClient.put(`/usuarios/${userId}`, profileData);
      const { data } = response.data;
      
      // Actualizar usuario en localStorage
      if (data) {
        setLocalStorageItem(config.auth.userKey, JSON.stringify(data));
      }
      
      return {
        success: true,
        message: response.data.message || 'Perfil actualizado exitosamente',
        user: data
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  }
} 