export interface ConexionAgua {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    tipomaterial?: string;
    coddiametro?: string;
    pavconagu?: string;
    llavemed?: string;
    vereda?: string;
    fechainsconagu?: string;
    loccaja?: string;
    tipocorte?: string;
    tipofugas?: string;
    tipocaja?: string;
    estadocaja?: string;
    tipotapa?: string;
    esttapa?: string;
    estconexion?: string;
    creador: string;
    estareg: number;
    fechareg?: string;
    fechasolagu?: string;
    fechafactagu?: string;
    codproyectoagu?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    procesado: number;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    flagexoneraagua: number;
    diatubomatrizagu?: string;
    latitud_a?: string;
    longitud_a?: string;
    clandestino_a: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    tipoaccesoriosconex?: string;
    tipoaccesoriosnoreglamentados?: string;
    tipomodelocajaconex?: string;
    concajaagua: number;
    contapaagua: number;
    situacionconex?: string;
}

export interface ConexionAguaDto {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    tipomaterial?: string;
    coddiametro?: string;
    pavconagu?: string;
    llavemed?: string;
    vereda?: string;
    fechainsconagu?: string;
    loccaja?: string;
    tipocorte?: string;
    tipofugas?: string;
    tipocaja?: string;
    estadocaja?: string;
    tipotapa?: string;
    esttapa?: string;
    estconexion?: string;
    creador: string;
    estareg: number;
    fechareg?: string;
    fechasolagu?: string;
    fechafactagu?: string;
    codproyectoagu?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    procesado: number;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    flagexoneraagua: number;
    diatubomatrizagu?: string;
    latitud_a?: string;
    longitud_a?: string;
    clandestino_a: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    tipoaccesoriosconex?: string;
    tipoaccesoriosnoreglamentados?: string;
    tipomodelocajaconex?: string;
    concajaagua: number;
    contapaagua: number;
    situacionconex?: string;
}

// Request para crear/actualizar conexión de agua
export interface ConexionAguaRequest {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    tipomaterial?: string;
    coddiametro?: string;
    pavconagu?: string;
    llavemed?: string;
    vereda?: string;
    fechainsconagu?: string;
    loccaja?: string;
    tipocorte?: string;
    tipofugas?: string;
    tipocaja?: string;
    estadocaja?: string;
    tipotapa?: string;
    esttapa?: string;
    estconexion?: string;
    fechasolagu?: string;
    fechafactagu?: string;
    codproyectoagu?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    procesado: number;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    flagexoneraagua: number;
    diatubomatrizagu?: string;
    latitud_a?: string;
    longitud_a?: string;
    clandestino_a: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    tipoaccesoriosconex?: string;
    tipoaccesoriosnoreglamentados?: string;
    tipomodelocajaconex?: string;
    concajaagua: number;
    contapaagua: number;
    situacionconex?: string;
}

// Response de la API
export interface ConexionAguaResponse {
    success: boolean;
    message: string;
    data: ConexionAguaDto;
    timestamp: string;
}

export interface ConexionesAguaResponse {
    success: boolean;
    message: string;
    data: ConexionAguaDto[];
    timestamp: string;
}

// Funciones de utilidad para conexiones de agua
export const isActive = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.estareg === 1;
};

export const isProcessed = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.procesado === 1;
};

export const isClandestine = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.clandestino === 1;
};

export const isClandestineA = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.clandestino_a === 1;
};

export const isWaterExempt = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.flagexoneraagua === 1;
};

export const hasWaterBox = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.concajaagua === 1;
};

export const hasWaterCover = (conexionAgua: ConexionAguaDto | null): boolean => {
    return conexionAgua?.contapaagua === 1;
};

export const getConexionAguaCode = (conexionAgua: ConexionAguaDto | null): string => {
    if (!conexionAgua) return "";
    return `${conexionAgua.codemp}-${conexionAgua.codsuc}-${conexionAgua.codcliente}`;
};

export const getConexionAguaCoordinates = (conexionAgua: ConexionAguaDto | null): { lat: string; lng: string } | null => {
    if (!conexionAgua?.latitud_a || !conexionAgua?.longitud_a) return null;
    return {
        lat: conexionAgua.latitud_a,
        lng: conexionAgua.longitud_a
    };
};

export const getCornerDistance = (conexionAgua: ConexionAguaDto | null): number => {
    if (!conexionAgua) return 0;
    return conexionAgua.distancia_esq || 0;
};

export const getCornerDistance2 = (conexionAgua: ConexionAguaDto | null): number => {
    if (!conexionAgua) return 0;
    return conexionAgua.distancia_esq_2 || 0;
};

export const getInstallationDate = (conexionAgua: ConexionAguaDto | null): string => {
    if (!conexionAgua) return "";
    return conexionAgua.fechainsconagu || "";
};

export const getContractDate = (conexionAgua: ConexionAguaDto | null): string => {
    if (!conexionAgua) return "";
    return conexionAgua.fechacontrato || "";
};

export const getRequestNumber = (conexionAgua: ConexionAguaDto | null): number => {
    if (!conexionAgua) return 0;
    return conexionAgua.nrosolicitud || 0;
}; 