// Tipos para el dashboard
export interface ReunionDto {
  id: number;
  titulo: string;
  fecha: string;
  horaInicio: string;
  estado: string;
  institucion?: {
    id: number;
    nombre: string;
  };
}

export interface ServicioInstitucionDto {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  institucion?: {
    id: number;
    nombre: string;
  };
  servicio?: {
    id: number;
    nombre: string;
  };
}

export interface DashboardStats {
  totalReuniones: number;
  reunionesPendientes: number;
  serviciosActivos: number;
  serviciosPorVencer: number;
} 