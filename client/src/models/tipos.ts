// ToDo: cambiar a otro archivo

// src/models/sector.ts
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

// src/models/manzana.ts
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

// src/models/calle.ts
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

// ============================================================================
// 📄 UBICACION
// ============================================================================

// src/models/tipocalle.ts
export interface TipoCalle {
  codemp: string;
  tipocalle: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null; // timestamp en string ISO o null
  descripcioncorta?: string | null;
}

// src/models/tipopavimento.ts
export interface TipoPavimento {
  codemp: string;
  pavconagu: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null; // timestamp en string ISO o null
  tipocon?: string | null;
  orden?: number | null;
}

// src/models/tipovereda.ts
export interface TipoVereda {
  codemp: string;
  vereda: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null; // timestamp en string ISO o null
  tipocon?: string | null;
  orden?: number | null;
  codequivalencia?: string | null;
}

// src/models/sucursal.ts
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


// ============================================================================
// 🔗 CONEXIONES
// ============================================================================

// src/models/tipoconexion.ts
export interface TipoConexion {
  codemp: string;
  tipocon: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
}

// src/models/tipoingresoconexion.ts
export interface TipoIngresoConexion {
  codemp: string;
  tipocon: string;
  tipoingreso: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipoestadoconexion.ts
export interface TipoEstadoConexion {
  codemp: string;
  tipocon: string;
  estconexion: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tiposituacionconexion.ts
export interface TipoSituacionConexion {
  codemp: string;
  tipocon: string;
  situacionconexion: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 📖 LECTURAS
// ============================================================================

// src/models/tipolectura.ts
export interface TipoLectura {
  codemp: string;
  tipolectura: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipolecturacampo.ts
export interface TipoLecturaCampo {
  codemp: string;
  tipolecturacampo: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipopresionagua.ts
export interface TipoPresionAgua {
  codemp: string;
  tipopresionagu: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🎛 MEDIDORES
// ============================================================================

// src/models/tipomedidor.ts
export interface TipoMedidor {
  codemp: string;
  tipomed: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  detalle?: string | null;
  abreviatura?: string | null;
  chorromultiple: number;
  orden?: number | null;
}

// src/models/tipollavemedidor.ts
export interface TipoLlaveMedidor {
  codemp: string;
  llavemed: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipomarcamedidor.ts
export interface TipoMarcaMedidor {
  codemp: string;
  marcamed: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipoestadomedidor.ts
export interface TipoEstadoMedidor {
  codemp: string;
  estadomed: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  flagobslectura: number;
  flaglecturaultima: number;
  promedialectura: number;
  impedimento: number;
  promedioauto: number;
  estregmov: number;
  permitelectura: number;
  exigirfotocampo: number;
  orden?: number | null;
  inoperativo: number;
  codequivalencia?: string | null;
}

// src/models/tipoposicionmedidor.ts
export interface TipoPosicionMedidor {
  codemp: string;
  posicionmed: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🏗 INFRAESTRUCTURA
// ============================================================================

// src/models/tipoconstruccion.ts
export interface TipoConstruccion {
  codemp: string;
  tipoconstruccion: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
  codequivalencia?: string | null;
}

// src/models/tipomaterialconstruccion.ts
export interface TipoMaterialConstruccion {
  codemp: string;
  tipocon: string;
  tipomaterialconst: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🔌 ACCESORIOS
// ============================================================================

// src/models/tipoaccesoriosconexion.ts
export interface TipoAccesoriosConexion {
  codemp: string;
  tipocon: string;
  tipoaccesoriosconex: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipoaccesoriosnoreglamentarios.ts
export interface TipoAccesoriosNoReglamentarios {
  codemp: string;
  tipocon: string;
  tipoaccesoriosnoreglamentados: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🧰 MATERIALES
// ============================================================================

// src/models/tipomaterial.ts
export interface TipoMaterial {
  codemp: string;
  tipocon: string;
  tipomaterial: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipocategoria.ts
export interface TipoCategoria {
  codemp: string;
  tipocategoria: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: string | null;
}

// src/models/tipooperacion.ts
export interface TipoOperacion {
  codemp: string;
  tipooperacion: string;
  codoperacion: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  asuntocarta?: string | null;
  detalles?: string | null;
}

// ============================================================================
// 📦 CAJAS
// ============================================================================

// src/models/tipocaja.ts
export interface TipoCaja {
  codemp: string;
  tipocon: string;
  tipocaja: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
  codequivalencia?: string | null;
}

// src/models/tipoestadocaja.ts
export interface TipoEstadoCaja {
  codemp: string;
  tipocon: string;
  estadocaja: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipolocalizacioncaja.ts
export interface TipoLocalizacionCaja {
  codemp: string;
  tipocon: string;
  loccaja: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
  codequivalencia?: string | null;
}

// src/models/tipomodelocajaconexion.ts
export interface TipoModeloCajaConexion {
  codemp: string;
  tipocon: string;
  tipomodelocajaconex: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🛡 TAPA Y ESTADO
// ============================================================================

// src/models/tipoestadotapa.ts
export interface TipoEstadoTapa {
  codemp: string;
  tipocon: string;
  esttapa: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipotapa.ts
export interface TipoTapa {
  codemp: string;
  tipocon: string;
  tipotapa: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tipotaponeo.ts
export interface TipoTaponeo {
  codemp: string;
  tipocon: string;
  tipotaponeo: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// ⚡ SERVICIOS
// ============================================================================

// src/models/tiposervicio.ts
export interface TipoServicio {
  codemp: string;
  tiposervicio: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null; // timestamp en string ISO o null
  abrev?: string | null;
  descripcion2?: string | null;
  orden?: number | null;
}

// src/models/tipoestadoservicio.ts
export interface TipoEstadoServicio {
  codemp: string;
  estadoservicio: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  idestadoservicio?: string | null;
  nombre?: string | null;
}

// ============================================================================
// 👥 USUARIOS
// ============================================================================

// src/models/tipousuario.ts
export interface TipoUsuario {
  codemp: string;
  tipousuario: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// src/models/tiporesponsable.ts
export interface TipoResponsable {
  codemp: string;
  tiporesponsable: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
  codequivalencia?: string | null;
}

// ============================================================================
// 📄 OBSERVACIONES
// ============================================================================

// src/models/tipocajaobservacion.ts
export interface TipoCajaObservacion {
  codemp: string;
  tipocon: string;
  tipocajaobserv: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 📄 FICHAS
// ============================================================================

// src/models/tipofichaincompleta.ts
export interface TipoFichaIncompleta {
  codemp: string;
  tipofichaincompleta: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 💧 CORTES Y FUGAS
// ============================================================================

// src/models/tipocorteservicio.ts
export interface TipoCorteServicio {
  codemp: string;
  tipocon: string;
  tipocorte: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  flagcore: number;
  core?: number | null;
  codotros?: string | null;
  muestrarweb: number;
  impedimento: number;
  codotrosreapertura?: string | null;
  orden?: number | null;
  mostrarsoloactivos: number;
  cortedratico: number;
  activo: number;
  cortado: number;
  nrofotos?: number | null;
}

// src/models/tipofugas.ts
export interface TipoFugas {
  codemp: string;
  tipocon: string;
  tipofugas: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 🧾 FACTURACIÓN
// ============================================================================

// src/models/tipofacturacion.ts
export interface TipoFacturacion {
  codemp: string;
  tipofacturacion: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}

// ============================================================================
// 📋 ACCIONES COMERCIALES
// ============================================================================

// src/models/tipoaccioncomercial.ts
export interface TipoAccionComercial {
  codemp: string;
  tipoacccomercial: string;
  descripcion?: string | null;
  estareg: number;
  creador: string;
  fechareg: string | null;
  orden?: number | null;
}
