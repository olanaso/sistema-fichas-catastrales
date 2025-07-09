export interface Usuario {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  password?: string; // Solo para envío, no se incluye en respuestas
  activo: boolean;
  rol: Rol[];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
}

export interface Rol {
  id: number;
  codigo: string;
  rol: string;
}

export interface Authority {
  authority: string;
}

export interface UsuarioDto {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  activo: boolean;
  rol: Rol[];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    message: string;
    user: UsuarioDto;
    refreshToken: string;
  };
  timestamp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp?: string;
}