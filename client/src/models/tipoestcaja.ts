export interface TipoEstCaja {
    codemp: string;
    tipocon: string;
    estadocaja: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

export interface TipoEstCajaDto {
    codemp: string;
    tipocon: string;
    estadocaja: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

// Request para crear/actualizar tipo de estado de caja
export interface TipoEstCajaRequest {
    codemp: string;
    tipocon: string;
    estadocaja: string;
    descripcion?: string;
    orden?: number;
}

// Response de la API
export interface TipoEstCajaResponse {
    success: boolean;
    message: string;
    data: TipoEstCajaDto;
    timestamp: string;
}

export interface TipoEstCajasResponse {
    success: boolean;
    message: string;
    data: TipoEstCajaDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de estado de caja
export const isActive = (tipoEstCaja: TipoEstCajaDto | null): boolean => {
    return tipoEstCaja?.estareg === 1;
};

export const getTipoEstCajaDescription = (tipoEstCaja: TipoEstCajaDto | null): string => {
    if (!tipoEstCaja) return "Tipo de Estado de Caja";
    return tipoEstCaja.descripcion || tipoEstCaja.estadocaja;
};

export const getTipoEstCajaCode = (tipoEstCaja: TipoEstCajaDto | null): string => {
    if (!tipoEstCaja) return "";
    return `${tipoEstCaja.codemp}-${tipoEstCaja.tipocon}-${tipoEstCaja.estadocaja}`;
};

export const getTipoEstCajaOrder = (tipoEstCaja: TipoEstCajaDto | null): number => {
    if (!tipoEstCaja) return 0;
    return tipoEstCaja.orden || 0;
};

export const getConnectionType = (tipoEstCaja: TipoEstCajaDto | null): string => {
    if (!tipoEstCaja) return "";
    return tipoEstCaja.tipocon;
};

export const getBoxStatus = (tipoEstCaja: TipoEstCajaDto | null): string => {
    if (!tipoEstCaja) return "";
    return tipoEstCaja.estadocaja;
};

// Función para ordenar tipos de estado de caja
export const sortTipoEstCajas = (tipoEstCajas: TipoEstCajaDto[]): TipoEstCajaDto[] => {
    return tipoEstCajas.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
};

// Función para filtrar por tipo de conexión
export const filterByConnectionType = (tipoEstCajas: TipoEstCajaDto[], tipocon: string): TipoEstCajaDto[] => {
    return tipoEstCajas.filter(estCaja => estCaja.tipocon === tipocon);
}; 