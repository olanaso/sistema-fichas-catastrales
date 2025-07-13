export interface Predio {
    codemp: string;
    codsuc: string;
    codcliente: number;
    fichaincompleta?: string;
    tipoconstruccion?: string;
    nropisos?: number;
    tipoaba?: string;
    piscina?: string;
    codalmacenaje?: string;
    flagpiloto: number;
    tipopredio?: string;
    actividad?: string;
    tipofactible?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    latitud?: string;
    longitud?: string;
    fechainspeccion?: string;
    nropartregistral?: string;
    intradomiciliario: number;
    hasmallintada: number;
    tipomaterialconstr?: string;
    multifamiliar?: string;
    codigo_multi?: number;
    medidalotefrente?: number;
    medidalotefrente_2?: number;
    observacion?: string;
    codencuestador?: string;
    fechaencuestacampo?: string;
    loginupdate?: string;
    fechaupdate?: string;
    fechasupervvisor?: string;
    loginsupervisor?: string;
    envio_sunass?: number;
    secuencia?: number;
    clandestino: number;
    codoperador_1?: string;
    codoperador_2?: string;
    factualizcatastral?: string;
    habitada?: number;
}

export interface PredioDto {
    codemp: string;
    codsuc: string;
    codcliente: number;
    fichaincompleta?: string;
    tipoconstruccion?: string;
    nropisos?: number;
    tipoaba?: string;
    piscina?: string;
    codalmacenaje?: string;
    flagpiloto: number;
    tipopredio?: string;
    actividad?: string;
    tipofactible?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    latitud?: string;
    longitud?: string;
    fechainspeccion?: string;
    nropartregistral?: string;
    intradomiciliario: number;
    hasmallintada: number;
    tipomaterialconstr?: string;
    multifamiliar?: string;
    codigo_multi?: number;
    medidalotefrente?: number;
    medidalotefrente_2?: number;
    observacion?: string;
    codencuestador?: string;
    fechaencuestacampo?: string;
    loginupdate?: string;
    fechaupdate?: string;
    fechasupervvisor?: string;
    loginsupervisor?: string;
    envio_sunass?: number;
    secuencia?: number;
    clandestino: number;
    codoperador_1?: string;
    codoperador_2?: string;
    factualizcatastral?: string;
    habitada?: number;
}

// Request para crear/actualizar predio
export interface PredioRequest {
    codemp: string;
    codsuc: string;
    codcliente: number;
    fichaincompleta?: string;
    tipoconstruccion?: string;
    nropisos?: number;
    tipoaba?: string;
    piscina?: string;
    codalmacenaje?: string;
    flagpiloto: number;
    tipopredio?: string;
    actividad?: string;
    tipofactible?: string;
    latitud?: string;
    longitud?: string;
    fechainspeccion?: string;
    nropartregistral?: string;
    intradomiciliario: number;
    hasmallintada: number;
    tipomaterialconstr?: string;
    multifamiliar?: string;
    codigo_multi?: number;
    medidalotefrente?: number;
    medidalotefrente_2?: number;
    observacion?: string;
    codencuestador?: string;
    fechaencuestacampo?: string;
    envio_sunass?: number;
    secuencia?: number;
    clandestino: number;
    codoperador_1?: string;
    codoperador_2?: string;
    factualizcatastral?: string;
    habitada?: number;
}

// Response de la API
export interface PredioResponse {
    success: boolean;
    message: string;
    data: PredioDto;
    timestamp: string;
}

export interface PrediosResponse {
    success: boolean;
    message: string;
    data: PredioDto[];
    timestamp: string;
}

// Funciones de utilidad para predios
export const isActive = (predio: PredioDto | null): boolean => {
    return predio?.estareg === 1;
};

export const isPilot = (predio: PredioDto | null): boolean => {
    return predio?.flagpiloto === 1;
};

export const isClandestine = (predio: PredioDto | null): boolean => {
    return predio?.clandestino === 1;
};

export const isInhabited = (predio: PredioDto | null): boolean => {
    return predio?.habitada === 1;
};

export const isIntradomiciliary = (predio: PredioDto | null): boolean => {
    return predio?.intradomiciliario === 1;
};

export const hasPool = (predio: PredioDto | null): boolean => {
    return predio?.piscina !== null && predio?.piscina !== undefined && predio?.piscina !== '';
};

export const isMultifamily = (predio: PredioDto | null): boolean => {
    return predio?.multifamiliar === '1' || predio?.multifamiliar === 'S';
};

export const hasCoordinates = (predio: PredioDto | null): boolean => {
    return !!(predio?.latitud && predio?.longitud);
};

export const getPredioCode = (predio: PredioDto | null): string => {
    if (!predio) return "";
    return `${predio.codemp}-${predio.codsuc}-${predio.codcliente}`;
};

export const getPredioCoordinates = (predio: PredioDto | null): { lat: string; lng: string } | null => {
    if (!predio?.latitud || !predio?.longitud) return null;
    return {
        lat: predio.latitud,
        lng: predio.longitud
    };
};

export const getPredioFloors = (predio: PredioDto | null): number => {
    if (!predio) return 0;
    return predio.nropisos || 0;
};

export const getPredioFrontMeasure = (predio: PredioDto | null): number => {
    if (!predio) return 0;
    return predio.medidalotefrente || 0;
};

export const hasIncompleteForm = (predio: PredioDto | null): boolean => {
    return predio?.fichaincompleta !== null && predio?.fichaincompleta !== undefined && predio?.fichaincompleta !== '';
};

export const wasSentToSunass = (predio: PredioDto | null): boolean => {
    return predio?.envio_sunass === 1;
}; 