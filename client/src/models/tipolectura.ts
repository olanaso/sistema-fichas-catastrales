export interface TipoLectura {
    codemp: string;
    tipolectura: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

export interface TipoLecturaDto {
    codemp: string;
    tipolectura: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

// Request para crear/actualizar tipo de lectura
export interface TipoLecturaRequest {
    codemp: string;
    tipolectura: string;
    descripcion?: string;
    orden?: number;
}

// Response de la API
export interface TipoLecturaResponse {
    success: boolean;
    message: string;
    data: TipoLecturaDto;
    timestamp: string;
}

export interface TipoLecturasResponse {
    success: boolean;
    message: string;
    data: TipoLecturaDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de lectura
export const isActive = (tipoLectura: TipoLecturaDto | null): boolean => {
    return tipoLectura?.estareg === 1;
};

export const getTipoLecturaDescription = (tipoLectura: TipoLecturaDto | null): string => {
    if (!tipoLectura) return "Tipo de Lectura";
    return tipoLectura.descripcion || tipoLectura.tipolectura;
};

export const getTipoLecturaCode = (tipoLectura: TipoLecturaDto | null): string => {
    if (!tipoLectura) return "";
    return `${tipoLectura.codemp}-${tipoLectura.tipolectura}`;
};

export const getTipoLecturaOrder = (tipoLectura: TipoLecturaDto | null): number => {
    if (!tipoLectura) return 0;
    return tipoLectura.orden || 0;
};

// Función para ordenar tipos de lectura
export const sortTipoLecturas = (tipoLecturas: TipoLecturaDto[]): TipoLecturaDto[] => {
    return tipoLecturas.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
}; 