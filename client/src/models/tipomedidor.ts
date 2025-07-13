export interface TipoMedidor {
    codemp: string;
    tipomed: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    detalle?: string;
    abreviatura?: string;
    chorromultiple: number;
    orden?: number;
}

export interface TipoMedidorDto {
    codemp: string;
    tipomed: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    detalle?: string;
    abreviatura?: string;
    chorromultiple: number;
    orden?: number;
}

// Request para crear/actualizar tipo de medidor
export interface TipoMedidorRequest {
    codemp: string;
    tipomed: string;
    descripcion?: string;
    detalle?: string;
    abreviatura?: string;
    chorromultiple: number;
    orden?: number;
}

// Response de la API
export interface TipoMedidorResponse {
    success: boolean;
    message: string;
    data: TipoMedidorDto;
    timestamp: string;
}

export interface TipoMedidoresResponse {
    success: boolean;
    message: string;
    data: TipoMedidorDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de medidor
export const isActive = (tipoMedidor: TipoMedidorDto | null): boolean => {
    return tipoMedidor?.estareg === 1;
};

export const hasMultipleStream = (tipoMedidor: TipoMedidorDto | null): boolean => {
    return tipoMedidor?.chorromultiple === 1;
};

export const getTipoMedidorDescription = (tipoMedidor: TipoMedidorDto | null): string => {
    if (!tipoMedidor) return "Tipo de Medidor";
    return tipoMedidor.descripcion || tipoMedidor.tipomed;
};

export const getTipoMedidorCode = (tipoMedidor: TipoMedidorDto | null): string => {
    if (!tipoMedidor) return "";
    return `${tipoMedidor.codemp}-${tipoMedidor.tipomed}`;
};

export const getTipoMedidorAbbreviation = (tipoMedidor: TipoMedidorDto | null): string => {
    if (!tipoMedidor) return "";
    return tipoMedidor.abreviatura || tipoMedidor.tipomed;
};

export const getTipoMedidorDetail = (tipoMedidor: TipoMedidorDto | null): string => {
    if (!tipoMedidor) return "";
    return tipoMedidor.detalle || "";
};

export const getTipoMedidorOrder = (tipoMedidor: TipoMedidorDto | null): number => {
    if (!tipoMedidor) return 0;
    return tipoMedidor.orden || 0;
};

// Función para ordenar tipos de medidor
export const sortTipoMedidores = (tipoMedidores: TipoMedidorDto[]): TipoMedidorDto[] => {
    return tipoMedidores.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
}; 