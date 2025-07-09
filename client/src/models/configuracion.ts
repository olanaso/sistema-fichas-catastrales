// DTO para configuración
export interface ConfiguracionDto {
  id: number;
  nombre_institucion: string;
  correo: string;
  correo_secundario: string;
  numero_celular: string;
  horario_inicio_atencion: string;
  horario_fin_atencion: string;
  horario_break_inicio: string;
  horario_break_fin: string;
  permitir_reuniones_feriadas: boolean;
  correo_notificacion: string;
  gmail_email: string;
  gmail_password: string;
}

// Request para crear/actualizar configuración
export interface ConfiguracionRequest {
  nombre_institucion: string;
  correo: string;
  correo_secundario: string;
  numero_celular: string;
  horario_inicio_atencion: string;
  horario_fin_atencion: string;
  horario_break_inicio: string;
  horario_break_fin: string;
  permitir_reuniones_feriadas: boolean;
  correo_notificacion: string;
  gmail_email: string;
  gmail_password: string;
}
