export interface Medidor {
    codemp: string;
    codsuc: string;
    codcliente: number;
    marcamed?: string;
    estadomed?: string;
    posicionmed?: string;
    tipolectura?: string;
    fechainsmed?: string;
    nromed?: string;
    lecturaanterior?: number;
    lecturaultima?: number;
    consumo?: number;
    lecturapromedio?: number;
    fechalecturault?: string;
    fechalecturaant?: string;
    modelomed?: string;
    aniofabmed?: string;
    estadolectura?: string;
    fecharevmed?: string;
    capacidadmed?: string;
    coddiametro?: string;
    tipopromedio: string;
    tipocon?: string;
    tipomed?: string;
    codrutalectura?: number;
    fechamanmed?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    nroordenrutalect?: number;
    obslectura?: string;
    nrolectura?: string;
    consumo_1?: number;
    consumo_2?: number;
    consumo_3?: number;
    consumo_4?: number;
    consumo_5?: number;
    consumo_6?: number;
    clasemetrolog?: string;
    fecharetiro?: string;
    fechareinst?: string;
    fechacontrslabor?: string;
    fechacontrscampo?: string;
    resultadocontrastacion?: string;
    situacionmed?: string;
    fechaaforoini?: string;
    cdispersos: number;
    esdelaempresa: number;
    mselectivo: number;
    radio?: string;
    contrasta?: string;
    mednroanterior?: string;
    nromedmedido?: string;
    accesoriomed?: string;
    consumoreb?: number;
    nromesespromedio?: number;
    modelcerthomologacion?: string;
    motivoretiro?: string;
    nroleturasmedido?: number;
    fecha_fact?: string;
}

export interface MedidorDto {
    codemp: string;
    codsuc: string;
    codcliente: number;
    marcamed?: string;
    estadomed?: string;
    posicionmed?: string;
    tipolectura?: string;
    fechainsmed?: string;
    nromed?: string;
    lecturaanterior?: number;
    lecturaultima?: number;
    consumo?: number;
    lecturapromedio?: number;
    fechalecturault?: string;
    fechalecturaant?: string;
    modelomed?: string;
    aniofabmed?: string;
    estadolectura?: string;
    fecharevmed?: string;
    capacidadmed?: string;
    coddiametro?: string;
    tipopromedio: string;
    tipocon?: string;
    tipomed?: string;
    codrutalectura?: number;
    fechamanmed?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    nroordenrutalect?: number;
    obslectura?: string;
    nrolectura?: string;
    consumo_1?: number;
    consumo_2?: number;
    consumo_3?: number;
    consumo_4?: number;
    consumo_5?: number;
    consumo_6?: number;
    clasemetrolog?: string;
    fecharetiro?: string;
    fechareinst?: string;
    fechacontrslabor?: string;
    fechacontrscampo?: string;
    resultadocontrastacion?: string;
    situacionmed?: string;
    fechaaforoini?: string;
    cdispersos: number;
    esdelaempresa: number;
    mselectivo: number;
    radio?: string;
    contrasta?: string;
    mednroanterior?: string;
    nromedmedido?: string;
    accesoriomed?: string;
    consumoreb?: number;
    nromesespromedio?: number;
    modelcerthomologacion?: string;
    motivoretiro?: string;
    nroleturasmedido?: number;
    fecha_fact?: string;
}

// Request para crear/actualizar medidor
export interface MedidorRequest {
    codemp: string;
    codsuc: string;
    codcliente: number;
    marcamed?: string;
    estadomed?: string;
    posicionmed?: string;
    tipolectura?: string;
    fechainsmed?: string;
    nromed?: string;
    lecturaanterior?: number;
    lecturaultima?: number;
    consumo?: number;
    lecturapromedio?: number;
    fechalecturault?: string;
    fechalecturaant?: string;
    modelomed?: string;
    aniofabmed?: string;
    estadolectura?: string;
    fecharevmed?: string;
    capacidadmed?: string;
    coddiametro?: string;
    tipopromedio: string;
    tipocon?: string;
    tipomed?: string;
    codrutalectura?: number;
    fechamanmed?: string;
    nroordenrutalect?: number;
    obslectura?: string;
    nrolectura?: string;
    consumo_1?: number;
    consumo_2?: number;
    consumo_3?: number;
    consumo_4?: number;
    consumo_5?: number;
    consumo_6?: number;
    clasemetrolog?: string;
    fecharetiro?: string;
    fechareinst?: string;
    fechacontrslabor?: string;
    fechacontrscampo?: string;
    resultadocontrastacion?: string;
    situacionmed?: string;
    fechaaforoini?: string;
    cdispersos: number;
    esdelaempresa: number;
    mselectivo: number;
    radio?: string;
    contrasta?: string;
    mednroanterior?: string;
    nromedmedido?: string;
    accesoriomed?: string;
    consumoreb?: number;
    nromesespromedio?: number;
    modelcerthomologacion?: string;
    motivoretiro?: string;
    nroleturasmedido?: number;
    fecha_fact?: string;
}

// Response de la API
export interface MedidorResponse {
    success: boolean;
    message: string;
    data: MedidorDto;
    timestamp: string;
}

export interface MedidoresResponse {
    success: boolean;
    message: string;
    data: MedidorDto[];
    timestamp: string;
}

// Funciones de utilidad para medidores
export const isActive = (medidor: MedidorDto | null): boolean => {
    return medidor?.estareg === 1;
};

export const isCompanyOwned = (medidor: MedidorDto | null): boolean => {
    return medidor?.esdelaempresa === 1;
};

export const isSelective = (medidor: MedidorDto | null): boolean => {
    return medidor?.mselectivo === 1;
};

export const hasDispersedConsumption = (medidor: MedidorDto | null): boolean => {
    return medidor?.cdispersos === 1;
};

export const getMedidorCode = (medidor: MedidorDto | null): string => {
    if (!medidor) return "";
    return `${medidor.codemp}-${medidor.codsuc}-${medidor.codcliente}`;
};

export const getMedidorNumber = (medidor: MedidorDto | null): string => {
    if (!medidor) return "";
    return medidor.nromed || "";
};

export const getCurrentConsumption = (medidor: MedidorDto | null): number => {
    if (!medidor) return 0;
    return medidor.consumo || 0;
};

export const getAverageConsumption = (medidor: MedidorDto | null): number => {
    if (!medidor) return 0;
    return medidor.lecturapromedio || 0;
};

export const getLastReading = (medidor: MedidorDto | null): number => {
    if (!medidor) return 0;
    return medidor.lecturaultima || 0;
};

export const getPreviousReading = (medidor: MedidorDto | null): number => {
    if (!medidor) return 0;
    return medidor.lecturaanterior || 0;
};

export const getConsumptionHistory = (medidor: MedidorDto | null): number[] => {
    if (!medidor) return [];
    return [
        medidor.consumo_1 || 0,
        medidor.consumo_2 || 0,
        medidor.consumo_3 || 0,
        medidor.consumo_4 || 0,
        medidor.consumo_5 || 0,
        medidor.consumo_6 || 0
    ];
};

export const getMedidorAge = (medidor: MedidorDto | null): number => {
    if (!medidor?.aniofabmed) return 0;
    const currentYear = new Date().getFullYear();
    const fabricationYear = parseInt(medidor.aniofabmed);
    return currentYear - fabricationYear;
};

export const hasBeenRetired = (medidor: MedidorDto | null): boolean => {
    return !!(medidor?.fecharetiro);
};

export const hasBeenReinstalled = (medidor: MedidorDto | null): boolean => {
    return !!(medidor?.fechareinst);
};

export const getInstallationDate = (medidor: MedidorDto | null): string => {
    if (!medidor) return "";
    return medidor.fechainsmed || "";
};

export const getManufacturingYear = (medidor: MedidorDto | null): string => {
    if (!medidor) return "";
    return medidor.aniofabmed || "";
}; 