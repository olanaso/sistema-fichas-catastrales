// ====================
// INTERFACES PRINCIPALES
// ====================

export interface FichaCatastro {
    // Identificadores principales
    idficha: number;
    codemp: string;
    codsuc?: string;
    codprov?: string;
    codsector_new?: string;
    codmza_new?: string;
    nrolote_new?: string;
    nrosublote_new?: string;
    codcliente: number;
    nrocatastro: number;

    // Información de dirección
    cuadra?: string;
    nromunic?: string;
    mzamunic?: string;
    ltemunic?: string;
    numero_dir?: string;
    referencia?: string;
    referencia_new?: string;
    direccion_new?: string;
    direccion_campo?: string;
    direccion?: string;
    nrocalle?: string;
    urbanizacion?: string;

    // Información de construcción
    tipoconstruccion?: string;
    nropisos?: string;
    tipomaterialconst?: string;
    tipopredio?: string;

    // Información de servicio
    tiposervicio?: string;
    tiposervicio_new?: string;
    tipoaba?: string;
    piscina?: string;
    codalmacenaje?: string;
    tipousuario?: string;
    estadoservicio?: string;

    // Información del propietario/usuario
    propietario?: string;
    propietario_new?: string;
    dni?: string;
    habitada?: string;
    habitantes?: number;
    tiporesponsable?: string;
    celular?: string;
    nrocontrato?: string;
    email?: string;
    datos_correctos: number;

    // Información de reservorio y abastecimiento
    codreservorio?: string;
    codsectorabast?: string;
    catetar?: string;
    catetar_new?: string;
    unidusotmp?: string;
    actividad?: string;
    razonsocial?: string;

    // Conexión de agua
    situacionconex_a?: string;
    pavconagu_a?: string;
    vereda_a?: string;
    coddiametro_a?: string;
    coddiametro_anew?: string;
    tipomaterial_a?: string;
    tipoingreso?: string;
    concajaagua?: string;
    tipocaja_a?: string;
    loccaja_a?: string;
    estadocaja_a?: string;
    contapaagua?: string;
    tipotapa_a?: string;
    esttapa_a?: string;
    llavemed?: string;
    posicionmed?: string;
    tipocorte_a?: string;
    tipocerrado?: string;
    tipofugas_a?: string;
    tipocajaobserv?: string;
    tipoaccesoriosconex_a?: string;
    estconexion_a?: string;
    tipoaccesoriosnoreglamentados_a?: string;
    tipomodelocajaconex_a?: string;

    // Información del medidor
    tienemedidor?: string;
    nromed?: string;
    nromed_new?: string;
    modelomed?: string;
    anio?: string;
    lecturaultima?: number;
    fechainstalacion?: Date | string;
    marcamed?: string;
    coddiametro_m?: string;
    lectura?: string;
    tipofacturacion?: string;
    tipolectura?: string;
    estadomed?: string;
    medidoroperativo?: string;
    tipomed?: string;

    // Conexión de desagüe
    situacionconex_d?: string;
    coddiametro_d?: string;
    tipomaterial_d?: string;
    concajadesague?: string;
    tipocaja_d?: string;
    loccaja_d?: string;
    estadocaja_d?: string;
    contapadesague?: string;
    tipotapa_d?: string;
    esttapa_d?: string;
    tipofugas_d?: string;
    tipotapondeo_d?: string;
    pavconagu_d?: string;
    vereda_d?: string;
    fugasdesague?: string;
    tipomodelocajaconex_d?: string;

    // Información de servicios y horarios
    horasxdia?: string;
    diasxsemana?: string;
    presionagu?: string;
    suministroluz?: string;

    // Artefactos sanitarios
    nrolavatorios?: number;
    estadolavatorios?: string;
    nrolavadoras?: number;
    estadolavadoras?: string;
    nrowater?: number;
    estadowater?: string;
    nroduchas?: number;
    estadoduchas?: string;
    nrourinarios?: number;
    estadourinarios?: string;
    nrogrifos?: number;
    estadogrifos?: string;
    nropiscina?: number;
    estadopiscina?: string;
    nrotanquecisterna?: number;
    estadotanquecisterna?: string;
    nrotanqueelevado?: number;
    estadotanqueelevado?: string;

    // Información adicional
    observacion?: string;
    obs?: string;
    fichaincompleta?: string;
    tipoacccomercial?: string;
    sospechosovma?: string;

    // Medidas
    medidalotefrente?: number;
    medidaejeagua?: number;
    medidaejedesague?: number;

    // Información de geolocalización
    latitud?: string;
    longitud?: string;

    // Fotografías
    fotofachada?: string;
    fotocajaagua?: string;
    fotocajadesague?: string;
    fotodetalle4?: string;
    fotodetalle5?: string;

    // Información de visita
    fecha_visita?: Date | string;
    hora_visita?: string;

    // Personal
    gestor?: string;
    inspector?: string;
    codinspector?: string;
    encuestador?: string;

    // Información de brigada
    codbrigada?: string;

    // Campos de auditoría
    usermodificador?: string;
    fechamodificacion?: Date | string;
    creador?: string;
    fechareg?: Date | string;
    fecharegistro?: Date | string;

    // Control de estado
    fichaaprobada: number;
    fechaaprobacion?: Date | string;
    estadoficha?: string;
    fechaentregaficha?: Date | string;
    est_duplicado?: number;
    estareg: number;

    // Campos legacy
    codmza?: string;
    nrolote?: string;
    nrosublote?: string;

    // Nuevos campos
    asignado_accioncomercial?: string;
    fechaobservacion?: Date | string;
    detalleobservacion?: string;
}

// ====================
// DTO PARA TRANSFERENCIA
// ====================

export interface FichaCatastroDto {
    idficha: number;
    codemp: string;
    codsuc?: string;
    codprov?: string;
    codsector_new?: string;
    codmza_new?: string;
    nrolote_new?: string;
    nrosublote_new?: string;
    codcliente: number;
    nrocatastro: number;

    // Información básica
    direccion_completa?: string;
    propietario?: string;
    dni?: string;
    celular?: string;
    email?: string;

    // Estado de servicios
    tiene_agua?: boolean;
    tiene_desague?: boolean;
    tiene_medidor?: boolean;

    // Información del medidor
    nromed?: string;
    marcamed?: string;
    lecturaultima?: number;
    fechainstalacion?: string;

    // Geolocalización
    latitud?: string;
    longitud?: string;

    // Control
    fichaaprobada: number;
    estadoficha?: string;
    estareg: number;
    fechareg?: string;
    fechamodificacion?: string;

    // Nuevos campos
    asignado_accioncomercial?: string;
    fechaobservacion?: Date | string;
    detalleobservacion?: string;
}

// ====================
// TIPOS DE REQUEST/RESPONSE
// ====================

export interface CreateFichaCatastroRequest {
    codemp: string;
    codsuc?: string;
    codprov?: string;
    codsector_new?: string;
    codmza_new?: string;
    nrolote_new?: string;
    nrosublote_new?: string;
    codcliente: number;
    nrocatastro: number;

    // Información básica requerida
    direccion?: string;
    propietario?: string;
    dni?: string;

    // Información de ubicación
    latitud?: string;
    longitud?: string;

    // Personal
    inspector?: string;
    gestor?: string;

    // Resto de campos opcionales
    [key: string]: any;
}

export interface UpdateFichaCatastroRequest {
    idficha: number;
    usermodificador?: string;
    [key: string]: any;
}

export interface FichaCatastroResponse {
    success: boolean;
    data?: FichaCatastro;
    message?: string;
}

export interface FichaCatastroListResponse {
    success: boolean;
    data?: FichaCatastro[];
    total?: number;
    page?: number;
    limit?: number;
    message?: string;
}

// ====================
// TIPOS DE BÚSQUEDA Y FILTRADO
// ====================

export interface FichaCatastroFilters {
    codemp?: string;
    codsuc?: string;
    codprov?: string;
    codsector_new?: string;
    codmza_new?: string;
    nrolote_new?: string;
    codcliente?: number;
    nrocatastro?: number;
    propietario?: string;
    dni?: string;
    direccion?: string;
    inspector?: string;
    gestor?: string;
    estadoficha?: string;
    fichaaprobada?: number;
    fecha_visita_desde?: string;
    fecha_visita_hasta?: string;
    tiene_medidor?: boolean;
    estareg?: number;
}

export interface FichaCatastroSearchRequest {
    filters?: FichaCatastroFilters;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// ====================
// FUNCIONES DE UTILIDAD
// ====================

/**
 * Crea una nueva instancia de FichaCatastro con valores por defecto
 */
export function createFichaCatastro(data: Partial<FichaCatastro> = {}): FichaCatastro {
    return {
        idficha: 0,
        codemp: '',
        codcliente: 0,
        nrocatastro: 0,
        datos_correctos: 0,
        habitantes: 0,
        nrolavatorios: 0,
        nrolavadoras: 0,
        nrowater: 0,
        nroduchas: 0,
        nrourinarios: 0,
        nrogrifos: 0,
        nropiscina: 0,
        nrotanquecisterna: 0,
        nrotanqueelevado: 0,
        fichaaprobada: 0,
        estareg: 1,
        fechareg: new Date(),
        ...data
    };
}

/**
 * Convierte FichaCatastro a DTO
 */
export function fichaCatastroToDto(ficha: FichaCatastro): FichaCatastroDto {
    return {
        idficha: ficha.idficha,
        codemp: ficha.codemp,
        codsuc: ficha.codsuc,
        codprov: ficha.codprov,
        codsector_new: ficha.codsector_new,
        codmza_new: ficha.codmza_new,
        nrolote_new: ficha.nrolote_new,
        nrosublote_new: ficha.nrosublote_new,
        codcliente: ficha.codcliente,
        nrocatastro: ficha.nrocatastro,
        direccion_completa: buildDireccionCompleta(ficha),
        propietario: ficha.propietario,
        dni: ficha.dni,
        celular: ficha.celular,
        email: ficha.email,
        tiene_agua: ficha.situacionconex_a === 'CON_CONEXION',
        tiene_desague: ficha.situacionconex_d === 'CON_CONEXION',
        tiene_medidor: ficha.tienemedidor === 'SI',
        nromed: ficha.nromed,
        marcamed: ficha.marcamed,
        lecturaultima: ficha.lecturaultima,
        fechainstalacion: ficha.fechainstalacion?.toString(),
        latitud: ficha.latitud,
        longitud: ficha.longitud,
        fichaaprobada: ficha.fichaaprobada,
        estadoficha: ficha.estadoficha,
        estareg: ficha.estareg,
        fechareg: ficha.fechareg?.toString(),
        fechamodificacion: ficha.fechamodificacion?.toString()
    };
}

/**
 * Construye la dirección completa concatenando los campos de dirección
 */
export function buildDireccionCompleta(ficha: FichaCatastro): string {
    const partes: string[] = [];

    if (ficha.direccion_new) partes.push(ficha.direccion_new);
    else if (ficha.direccion) partes.push(ficha.direccion);

    if (ficha.numero_dir) partes.push(`N° ${ficha.numero_dir}`);
    if (ficha.urbanizacion) partes.push(ficha.urbanizacion);
    if (ficha.cuadra) partes.push(`Cuadra ${ficha.cuadra}`);
    if (ficha.mzamunic) partes.push(`Mz ${ficha.mzamunic}`);
    if (ficha.ltemunic) partes.push(`Lt ${ficha.ltemunic}`);

    return partes.join(', ') || 'Sin dirección';
}

/**
 * Valida si una ficha catastral tiene los datos mínimos requeridos
 */
export function validateFichaCatastro(ficha: Partial<FichaCatastro>): string[] {
    const errores: string[] = [];

    if (!ficha.codemp?.trim()) {
        errores.push('El código de empresa es requerido');
    }

    if (!ficha.codcliente || ficha.codcliente <= 0) {
        errores.push('El código de cliente es requerido y debe ser mayor a 0');
    }

    if (!ficha.nrocatastro || ficha.nrocatastro <= 0) {
        errores.push('El número de catastro es requerido y debe ser mayor a 0');
    }

    if (!ficha.propietario?.trim()) {
        errores.push('El nombre del propietario es requerido');
    }

    if (!ficha.inspector?.trim()) {
        errores.push('El inspector es requerido');
    }

    return errores;
}

/**
 * Verifica si la ficha está completa
 */
export function isFichaCompleta(ficha: FichaCatastro): boolean {
    // Verificar datos básicos
    if (!ficha.propietario || !ficha.dni || !ficha.direccion) {
        return false;
    }

    // Verificar información de servicios
    if (!ficha.situacionconex_a || !ficha.situacionconex_d) {
        return false;
    }

    // Si tiene medidor, verificar datos del medidor
    if (ficha.tienemedidor === 'SI' && (!ficha.nromed || !ficha.marcamed)) {
        return false;
    }

    // Verificar coordenadas GPS
    if (!ficha.latitud || !ficha.longitud) {
        return false;
    }

    return true;
}

/**
 * Calcula el total de artefactos sanitarios
 */
export function getTotalArtefactos(ficha: FichaCatastro): number {
    return (
        (ficha.nrolavatorios || 0) +
        (ficha.nrolavadoras || 0) +
        (ficha.nrowater || 0) +
        (ficha.nroduchas || 0) +
        (ficha.nrourinarios || 0) +
        (ficha.nrogrifos || 0) +
        (ficha.nropiscina || 0) +
        (ficha.nrotanquecisterna || 0) +
        (ficha.nrotanqueelevado || 0)
    );
}

/**
 * Obtiene el estado de la ficha en formato legible
 */
export function getEstadoFichaLabel(estadoficha?: string): string {
    const estados: Record<string, string> = {
        'P': 'Pendiente',
        'A': 'Aprobada',
        'R': 'Rechazada',
        'E': 'En revisión',
        'C': 'Completada'
    };

    return estados[estadoficha || ''] || 'Sin estado';
}

/**
 * Verifica si la ficha tiene coordenadas GPS válidas
 */
export function hasValidGPS(ficha: FichaCatastro): boolean {
    if (!ficha.latitud || !ficha.longitud) {
        return false;
    }

    const lat = parseFloat(ficha.latitud);
    const lng = parseFloat(ficha.longitud);

    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
}

/**
 * Obtiene las fotos de la ficha
 */
export function getFotosFicha(ficha: FichaCatastro): string[] {
    const fotos: string[] = [];

    if (ficha.fotofachada) fotos.push(ficha.fotofachada);
    if (ficha.fotocajaagua) fotos.push(ficha.fotocajaagua);
    if (ficha.fotocajadesague) fotos.push(ficha.fotocajadesague);
    if (ficha.fotodetalle4) fotos.push(ficha.fotodetalle4);
    if (ficha.fotodetalle5) fotos.push(ficha.fotodetalle5);

    return fotos;
}

/**
 * Formatea el código catastral completo
 */
export function formatCodigoCatastral(ficha: FichaCatastro): string {
    const partes: string[] = [];

    if (ficha.codprov) partes.push(ficha.codprov);
    if (ficha.codsector_new) partes.push(ficha.codsector_new);
    if (ficha.codmza_new) partes.push(ficha.codmza_new);
    if (ficha.nrolote_new) partes.push(ficha.nrolote_new);
    if (ficha.nrosublote_new) partes.push(ficha.nrosublote_new);

    return partes.join('-') || 'Sin código';
}

// ====================
// TIPOS DE ESTADO
// ====================

export type EstadoFicha = 'P' | 'A' | 'R' | 'E' | 'C';
export type TipoFacturacion = 'M' | 'F' | 'P' | 'C';
export type SituacionConexion = 'CON_CONEXION' | 'SIN_CONEXION' | 'FACTIBLE' | 'NO_FACTIBLE';
export type TieneServicio = 'SI' | 'NO'; 