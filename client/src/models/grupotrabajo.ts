export interface GrupoTrabajo {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: number
}

export interface GrupoTrabajoDto {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: number;
}

// Request para crear/actualizar grupo de trabajo
export interface GrupoTrabajoRequest {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: number;
}

// Response de la API
export interface GrupoTrabajoResponse {
    success: boolean;
    message: string;
    data: GrupoTrabajoDto;
    timestamp: string;
}

export interface GruposTrabajoResponse {
    success: boolean;
    message: string;
    data: GrupoTrabajoDto[];
    timestamp: string;
}
