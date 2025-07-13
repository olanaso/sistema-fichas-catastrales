export interface TipoEstTapa {
    codemp: string;
    tipocon: string;
    esttapa: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

export interface TipoEstTapaDto {
    codemp: string;
    tipocon: string;
    esttapa: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

// Request para crear/actualizar tipo de estado de tapa
export interface TipoEstTapaRequest {
    codemp: string;
    tipocon: string;
    esttapa: string;
    descripcion?: string;
    orden?: number;
}

// Response de la API
export interface TipoEstTapaResponse {
    success: boolean;
    message: string;
    data: TipoEstTapaDto;
    timestamp: string;
}

export interface TipoEstTapasResponse {
    success: boolean;
    message: string;
    data: TipoEstTapaDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de estado de tapa
export const isActive = (tipoEstTapa: TipoEstTapaDto | null): boolean => {
    return tipoEstTapa?.estareg === 1;
};

export const getTipoEstTapaDescription = (tipoEstTapa: TipoEstTapaDto | null): string => {
    if (!tipoEstTapa) return "Tipo de Estado de Tapa";
    return tipoEstTapa.descripcion || tipoEstTapa.esttapa;
};

export const getTipoEstTapaCode = (tipoEstTapa: TipoEstTapaDto | null): string => {
    if (!tipoEstTapa) return "";
    return `${tipoEstTapa.codemp}-${tipoEstTapa.tipocon}-${tipoEstTapa.esttapa}`;
};

export const getTipoEstTapaOrder = (tipoEstTapa: TipoEstTapaDto | null): number => {
    if (!tipoEstTapa) return 0;
    return tipoEstTapa.orden || 0;
};

export const getConnectionType = (tipoEstTapa: TipoEstTapaDto | null): string => {
    if (!tipoEstTapa) return "";
    return tipoEstTapa.tipocon;
};

export const getCoverStatus = (tipoEstTapa: TipoEstTapaDto | null): string => {
    if (!tipoEstTapa) return "";
    return tipoEstTapa.esttapa;
};

// Función para ordenar tipos de estado de tapa
export const sortTipoEstTapas = (tipoEstTapas: TipoEstTapaDto[]): TipoEstTapaDto[] => {
    return tipoEstTapas.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
};

// Función para filtrar por tipo de conexión
export const filterByConnectionType = (tipoEstTapas: TipoEstTapaDto[], tipocon: string): TipoEstTapaDto[] => {
    return tipoEstTapas.filter(estTapa => estTapa.tipocon === tipocon);
}; 