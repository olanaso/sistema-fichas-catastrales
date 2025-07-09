// DTO para configuración
export interface ConfiguracionDto {
  id: number;
  nombreSistema: string;
  nombreCorreo: string;
  conexionSici1: string;
  conexionSici2: string;
  logo: string;
  clienteUrl: string;
}

// Request para actualizar configuración
export interface ConfiguracionRequest {
  nombreSistema: string;
  nombreCorreo: string;
  conexionSici1: string;
  conexionSici2: string;
  logo?: string;
  clienteUrl: string;
}

// Response de la API
export interface ConfiguracionResponse {
  success: boolean;
  message: string;
  data: ConfiguracionDto;
  timestamp: string;
}
