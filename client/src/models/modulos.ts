
export interface Calle {
    codemp: string;
    codsuc: string;
    codcalle: number;
    tipocalle?: string | null;
    descripcioncalle?: string | null;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
}

export interface Empresa {
    codemp: string;
    nombre: string;
    direccion: string;
    ruc: string;
    telefono?: string | null;
    fax?: string | null;
    rep_legal: string;
    gerente: string;
    email?: string | null;
    website?: string | null;
    rubro: string;
    notas?: string | null;
    foto?: string | null;
    valorconsumoexc?: number | null;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
    ciudad?: string | null;
    calculoxporcalcanta: number;
    impcargofijo?: number | null;
    latitud?: number | null;
    longitud?: number | null;
    ccodeps?: string | null;
    dni_rep_legal?: string | null;
    dni_gerente?: string | null;
    periodoregulatorio?: string | null;
    fechafinoperacion?: string | null; // date en string ISO o null
    horaini?: string | null; // time en string o null
    horafin?: string | null; // time en string o null
    fechaserver?: string | null; // date en string ISO o null
    siglaresolucion?: string | null;
    siglacomercial?: string | null;
    horafincelular?: string | null; // time en string o null
    contratonuevo: number;
    gerencia?: string | null;
    nombreaniooficial?: string | null;
    direccionoficial?: string | null;
    lo?: string | null;
    min_espera_lectura?: number | null;
    coddpto?: string | null;
    fotoconsmcero: number;
    lecturas_tiemporeal: number;
    rutareportweb?: string | null;
    min_espera_enviolect?: number | null;
    resoltarifa?: string | null;
    ipwebapp?: string | null;
    validargpsmovil: number;
    urlovirtual?: string | null;
    mrse?: number | null;
    imgobligatorio: number;
    rutadescargaapp?: string | null;
    versionapp?: string | null;
}

export interface GrupoUsuario {
    codgrupo: string;
    desgrupo: string;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
}

export interface Manzana {
    codemp: string;
    codsuc: string;
    codsector: string;
    codmza: string;
    descripcion?: string | null;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
}

export interface Sector {
    codemp: string;
    codsuc: string;
    codsector: string;
    descripcion: string;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
    c_sect?: string | null;
    nomsec?: string | null;
    codsicap?: string | null;
    densidad?: number | null;
}

export interface Sucursal {
    codemp: string;
    codsuc: string;
    nombre: string;
    telefono?: string | null;
    direccion: string;
    administrador: string;
    notas?: string | null;
    intmora?: number | null;
    alcanta?: number | null;
    mora: number;
    inidefault: number;
    codcta?: string | null;
    estareg: number;
    creador: string;
    fechareg: string | null; // timestamp en string ISO o null
    destarifarecibo?: string | null;
    flaginterescerrados: number;
    flagmesconsumo: number;
    usoigv?: number | null;
    latitud?: number | null;
    longitud?: number | null;
    provincia?: string | null;
    distrito?: string | null;
    coddist?: string | null;
    codprov?: string | null;
    coddpto?: string | null;
    viviendas?: number | null;
    densidad?: number | null;
    codsicap?: string | null;
    seleccionar: number;
    loginjefatura?: string | null;
    idotass?: string | null;
}