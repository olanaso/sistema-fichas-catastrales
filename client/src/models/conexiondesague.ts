export interface ConexionDesague {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    coddiametro?: string;
    tipomaterial?: string;
    fechainsalc?: string;
    loccaja?: string;
    tipotapa?: string;
    tipocaja?: string;
    esttapa?: string;
    tipofugas?: string;
    estadocaja?: string;
    estconexion?: string;
    estadoalc?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    flagexoneraalc: number;
    codemisor?: string;
    aguasplubiales?: string;
    xderivacion: number;
    fechasolalc?: string;
    fechafactalc?: string;
    codproyectoalc?: string;
    descargafuentepropia: number;
    codfuentepropia?: string;
    tipocorte?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    tiposervicio?: string;
    diatubomatrizalc?: string;
    latitud_d?: string;
    longitud_d?: string;
    clandestino_d: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    pavconagu?: string;
    vereda?: string;
    atoro: number;
    tipomodelocajaconex?: string;
    concajadesague: number;
    contapadesague: number;
    sospechosovma: number;
}

export interface ConexionDesagueDto {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    coddiametro?: string;
    tipomaterial?: string;
    fechainsalc?: string;
    loccaja?: string;
    tipotapa?: string;
    tipocaja?: string;
    esttapa?: string;
    tipofugas?: string;
    estadocaja?: string;
    estconexion?: string;
    estadoalc?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    flagexoneraalc: number;
    codemisor?: string;
    aguasplubiales?: string;
    xderivacion: number;
    fechasolalc?: string;
    fechafactalc?: string;
    codproyectoalc?: string;
    descargafuentepropia: number;
    codfuentepropia?: string;
    tipocorte?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    tiposervicio?: string;
    diatubomatrizalc?: string;
    latitud_d?: string;
    longitud_d?: string;
    clandestino_d: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    pavconagu?: string;
    vereda?: string;
    atoro: number;
    tipomodelocajaconex?: string;
    concajadesague: number;
    contapadesague: number;
    sospechosovma: number;
}

// Request para crear/actualizar conexión de desagüe
export interface ConexionDesagueRequest {
    codemp: string;
    codsuc: string;
    codcliente: number;
    tipocon?: string;
    coddiametro?: string;
    tipomaterial?: string;
    fechainsalc?: string;
    loccaja?: string;
    tipotapa?: string;
    tipocaja?: string;
    esttapa?: string;
    tipofugas?: string;
    estadocaja?: string;
    estconexion?: string;
    estadoalc?: string;
    flagexoneraalc: number;
    codemisor?: string;
    aguasplubiales?: string;
    xderivacion: number;
    fechasolalc?: string;
    fechafactalc?: string;
    codproyectoalc?: string;
    descargafuentepropia: number;
    codfuentepropia?: string;
    tipocorte?: string;
    codservice?: string;
    tipooperacion?: string;
    codoperacion?: string;
    diapagocon?: string;
    nrosolicitud?: number;
    fechacontrato?: string;
    tiposervicio?: string;
    diatubomatrizalc?: string;
    latitud_d?: string;
    longitud_d?: string;
    clandestino_d: number;
    clandestino: number;
    distancia_esq?: number;
    distancia_esq_2?: number;
    pavconagu?: string;
    vereda?: string;
    atoro: number;
    tipomodelocajaconex?: string;
    concajadesague: number;
    contapadesague: number;
    sospechosovma: number;
}

// Response de la API
export interface ConexionDesagueResponse {
    success: boolean;
    message: string;
    data: ConexionDesagueDto;
    timestamp: string;
}

export interface ConexionesDesagueResponse {
    success: boolean;
    message: string;
    data: ConexionDesagueDto[];
    timestamp: string;
}

// Funciones de utilidad para conexiones de desagüe
export const isActive = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.estareg === 1;
};

export const isClandestine = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.clandestino === 1;
};

export const isClandestineD = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.clandestino_d === 1;
};

export const isSewerExempt = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.flagexoneraalc === 1;
};

export const hasDerivation = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.xderivacion === 1;
};

export const hasOwnSourceDischarge = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.descargafuentepropia === 1;
};

export const hasBlockage = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.atoro === 1;
};

export const hasSewerBox = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.concajadesague === 1;
};

export const hasSewerCover = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.contapadesague === 1;
};

export const isSuspiciousVMA = (conexionDesague: ConexionDesagueDto | null): boolean => {
    return conexionDesague?.sospechosovma === 1;
};

export const getConexionDesagueCode = (conexionDesague: ConexionDesagueDto | null): string => {
    if (!conexionDesague) return "";
    return `${conexionDesague.codemp}-${conexionDesague.codsuc}-${conexionDesague.codcliente}`;
};

export const getConexionDesagueCoordinates = (conexionDesague: ConexionDesagueDto | null): { lat: string; lng: string } | null => {
    if (!conexionDesague?.latitud_d || !conexionDesague?.longitud_d) return null;
    return {
        lat: conexionDesague.latitud_d,
        lng: conexionDesague.longitud_d
    };
};

export const getCornerDistance = (conexionDesague: ConexionDesagueDto | null): number => {
    if (!conexionDesague) return 0;
    return conexionDesague.distancia_esq || 0;
};

export const getCornerDistance2 = (conexionDesague: ConexionDesagueDto | null): number => {
    if (!conexionDesague) return 0;
    return conexionDesague.distancia_esq_2 || 0;
};

export const getInstallationDate = (conexionDesague: ConexionDesagueDto | null): string => {
    if (!conexionDesague) return "";
    return conexionDesague.fechainsalc || "";
};

export const getContractDate = (conexionDesague: ConexionDesagueDto | null): string => {
    if (!conexionDesague) return "";
    return conexionDesague.fechacontrato || "";
};

export const getRequestNumber = (conexionDesague: ConexionDesagueDto | null): number => {
    if (!conexionDesague) return 0;
    return conexionDesague.nrosolicitud || 0;
};

export const getOwnSourceCode = (conexionDesague: ConexionDesagueDto | null): string => {
    if (!conexionDesague) return "";
    return conexionDesague.codfuentepropia || "";
}; 