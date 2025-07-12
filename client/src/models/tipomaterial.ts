export interface TipoMaterial {
    codemp: string;
    tipocon: string;
    tipomaterial: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

export interface TipoMaterialDto {
    codemp: string;
    tipocon: string;
    tipomaterial: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

// Request para crear/actualizar tipo de material
export interface TipoMaterialRequest {
    codemp: string;
    tipocon: string;
    tipomaterial: string;
    descripcion?: string;
    orden?: number;
}

// Response de la API
export interface TipoMaterialResponse {
    success: boolean;
    message: string;
    data: TipoMaterialDto;
    timestamp: string;
}

export interface TipoMaterialesResponse {
    success: boolean;
    message: string;
    data: TipoMaterialDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de material
export const isActive = (tipoMaterial: TipoMaterialDto | null): boolean => {
    return tipoMaterial?.estareg === 1;
};

export const getTipoMaterialDescription = (tipoMaterial: TipoMaterialDto | null): string => {
    if (!tipoMaterial) return "Tipo de Material";
    return tipoMaterial.descripcion || tipoMaterial.tipomaterial;
};

export const getTipoMaterialCode = (tipoMaterial: TipoMaterialDto | null): string => {
    if (!tipoMaterial) return "";
    return `${tipoMaterial.codemp}-${tipoMaterial.tipocon}-${tipoMaterial.tipomaterial}`;
};

export const getTipoMaterialOrder = (tipoMaterial: TipoMaterialDto | null): number => {
    if (!tipoMaterial) return 0;
    return tipoMaterial.orden || 0;
};

export const getConnectionType = (tipoMaterial: TipoMaterialDto | null): string => {
    if (!tipoMaterial) return "";
    return tipoMaterial.tipocon;
};

export const getMaterialType = (tipoMaterial: TipoMaterialDto | null): string => {
    if (!tipoMaterial) return "";
    return tipoMaterial.tipomaterial;
};

// Función para ordenar tipos de material
export const sortTipoMateriales = (tipoMateriales: TipoMaterialDto[]): TipoMaterialDto[] => {
    return tipoMateriales.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
};

// Función para filtrar por tipo de conexión
export const filterByConnectionType = (tipoMateriales: TipoMaterialDto[], tipocon: string): TipoMaterialDto[] => {
    return tipoMateriales.filter(material => material.tipocon === tipocon);
}; 