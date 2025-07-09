// DTO para configuración
export interface ConfiguracionDto {
  id: number;
  
  // Grupo 1: Configuración del Sistema y Empresa
  nombreSistema: string;
  nombreCorreo: string;
  logo?: string;
  
  // Datos de la empresa
  ruc?: string;
  razonSocial?: string;
  direccion?: string;
  nombreComercial?: string;
  pais?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  
  // Grupo 2: Configuración de Correo
  correoSoporte?: string;
  hostCorreo?: string;
  passwordCorreo?: string;
  puertoCorreo?: number;
  usuarioCorreo?: string;
  
  // Grupo 3: Conexiones SICI y APIs
  conexionSici1: string;
  conexionSici2: string;
  clienteUrl: string;
  apiReniecRuc?: string;
  
  // Configuración de base de datos PostgreSQL
  hostDb?: string;
  usuarioDb?: string;
  passwordDb?: string;
  baseDatos?: string;
}

// Request para actualizar configuración
export interface ConfiguracionRequest {
  // Grupo 1: Configuración del Sistema y Empresa
  nombreSistema: string;
  nombreCorreo: string;
  logo?: string;
  
  // Datos de la empresa
  ruc?: string;
  razonSocial?: string;
  direccion?: string;
  nombreComercial?: string;
  pais?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  
  // Grupo 2: Configuración de Correo
  correoSoporte?: string;
  hostCorreo?: string;
  passwordCorreo?: string;
  puertoCorreo?: number;
  usuarioCorreo?: string;
  
  // Grupo 3: Conexiones SICI y APIs
  conexionSici1: string;
  conexionSici2: string;
  clienteUrl: string;
  apiReniecRuc?: string;
  
  // Configuración de base de datos PostgreSQL
  hostDb?: string;
  usuarioDb?: string;
  passwordDb?: string;
  baseDatos?: string;
}

// Response de la API
export interface ConfiguracionResponse {
  success: boolean;
  message: string;
  data: ConfiguracionDto;
  timestamp: string;
}
