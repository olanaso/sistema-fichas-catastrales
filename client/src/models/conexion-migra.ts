export interface ConexionMigra {
  PREREGION?: number;
  PREZONA?: number;
  PRESECTOR?: number;
  PREMZN?: number;
  PRELOTE?: number;
  PRESUBLOTE?: number;
  FICNRO?: number;
  PROFECPRE?: string; // date
  CODESTPRE?: number;
  PREFRONT?: number;
  PREINMPIS?: number;
  CODMATCON?: number;
  CODTIPRES?: number;
  PRECLINRO?: number;
  PRECONAGU?: number;
  PRECONDES?: number;
  PREAREATO?: number;
  PREAREACO?: number;
  PRERUTLEC?: number;
  PREREDAGU?: number;
  PREREDDES?: number;
  DIGCODX?: number;
  CODTIPINM?: number;
  PRERUTSEC?: number;
  CODESCLTE?: number;
  COSCALCOD?: number;
  CODABASAG?: number;
  CODABASDE?: number;
  CODTIPSER?: number;
  INSCRINRO?: string;
  CONFACFLAG?: number;
  CONFLAGIGV?: number;
  CLIGRUCOD?: number;
  CLIGRUSUB?: number;
  CLIGRUPRN?: number;
  CLIACCCOD?: number;
  CLILELX?: string;
  CLIRUCX?: string;
  CLITELX?: string;
  MOVIL?: string;
  CONFIAX?: string; // date
  CONDIAX?: number;
  CONFIDX?: string; // date
  CONDIDX?: number;
  MEDNROX?: string;
  MARCAMED?: string;
  MEDCAPX?: string;
  MEDFINX?: string; // date
  MEDLINX?: number;
  MEDRETX?: string; // date
  MEDLREX?: number;
  CIRCODX?: number;
  CUECODIGO?: number;
  CONDISTIP?: number;
  CONTRA?: string;
  CONRUTLEC?: number;
  CONUSOCAN?: number;
  FACCICCOD?: number;
  MEDNROR?: string;
  MEDCAPR?: string;
  BANCOD?: string;
  CUENTABAN?: string;
  CONDIACOX?: number;
  SOLNROCX?: number;
  FLAGPROG?: number;
  FECPROG?: string; // date
  PRELOCALI?: number;
  PREURBA?: number;
  PRECALLE?: number;
  PRENRO?: number;
  PREMUNI?: string;
  CLINOMX?: string;
  CONTIPMUL?: number;
  CONTIPULT?: number;
  REPREGION?: number;
  REPZONA?: number;
  REPSECTOR?: number;
  REPRUTREP?: number;
  MAIL1?: string;
  MAIL2?: string;
  CORELECLI?: string;
  CORELECLI2?: string;
  COBEXT?: string;
  CONTIPMED?: number;
  CONCLIPRI?: string;
  BENFACAJU?: number;
  MICSECCOD?: number;
  CLIREFUBI?: string;
  COESTE?: number;
  CONORTE?: number;
  COTA?: number;
  CLINOMPERJ?: string;
  CLILELPERJ?: string;
  CLIDOCSUS?: string;
  CLADESCON?: number;
} 

export interface DataMigra {
  preregion?: string;
  provincia?: string;
  prezona?: string;
  sucursal?: string;
  sector?: string;
  manzana?: string;
  lote?: string;
  sublote?: string;
  codcliente?: number;
  suministro?: string;
  precalle?: string;
  CALTIP?: string;
  calle?: string;
  cuadra?: string;
  nro_muni?: string;
  mz_muni?: string;
  lt_muni?: string;
  preurba?: string;
  URBTIP?: string;
  urbanizacion?: string;
  tipoconstruccion?: string;
  tipo_construccion?: string;
  piso?: string | null;
  codtipser?: string;
  tipo_servicio?: string;
  codabasag?: string;
  tipo_abastecimiento?: string;
  cod_piscina?: string | null;
  piscina_desc?: string;
  codtipres?: string;
  tipo_reservorio?: string;
  codesclte?: string;
  tipo_usuarioa?: string;
  cliente?: string;
  ruc?: string;
  nro_habitantes?: string;
  tiporesponsable?: string;
  tipo_responsable?: string;
  telefono?: string;
  nro_contrato?: string;
  codestado?: string;
  estado_servicio?: string;
  pavconagu_a?: string;
  pavimentacion?: string;
  vereda_a?: string;
  vereda?: string;
  condiacod?: string;
  diametro?: string;
  conmateri?: string;
  tipo_material?: string;
  tipoingreso?: string;
  tipo_de_ingreso?: string;
  caja_con_agua?: string;
  concajmat?: string;
  material_caja?: string;
  loccaja_a?: string;
  localizacion_caja?: string;
  estadocaja_a?: string;
  estado_caja?: string;
  con_tapa_agua?: string;
  tipotapa_a?: string;
  material_tapa?: string;
  esttapa_a?: string;
  estado_tapa?: string;
  llavemed?: string;
  llaves?: string;
  posicionmed?: string;
  posicion_medidor?: string;
  tipocorte_a?: string;
  tipo_corte?: string;
  tipocerrado?: string;
  razon_corte?: string;
  tipofugas_a?: string;
  fugas?: string;
  tipocajaobserv?: string;
  caja_observacion?: string;
  tiene_medidor?: string;
  medidor?: string;
  lectura_medidor?: string;
  fecha_instalacion?: string;
  marcamed?: string;
  marca?: string;
  diametro_medidor_cod?: string;
  diametro_medidor?: string;
  lectura?: string;
  tipo_facturacion?: string;
  tipolectura?: string;
  tipo_lectura?: string;
  estadomed?: string;
  estado_medidor?: string;
  operativo?: string;
  condestad?: string;
  situacion_desague?: string;
  condidcod?: string;
  diametro_d?: string;
  conmatdes?: string;
  tipo_material_d?: string;
  con_caja_desague?: string;
  concajmde?: string;
  caja_d?: string;
  cod_ubica?: string;
  localizacion_desague?: string;
  estadocaja_d?: string;
  estado_caja_d?: string;
  con_tapa_desague?: string;
  tipotapa_d?: string;
  tapa_d?: string;
  tapa_d_estado?: string;
  estado_tapa_d?: string;
  tipofugas_d?: string;
  fugas_d?: string;
  presionagu?: string;
  presion_agua?: string;
  ficha_incompleta?: string;
  fichaincompleta?: string;
  motivo?: string;
  tipoacccomercial?: string;
  accion_comercial?: string;
  encuestador?: string;
  nombres?: string;
  usermodificador?: string;
  nombres_modificador?: string;
  fecha_modificacion?: string;
  creador?: string;
  nombres_creador?: string;
  fechareg?: string;
  estado?: string;
  fecharegistro?: string;
  fichaaprobada?: string;
  fechaaprobacion?: string;
  idficha?: string;
  cant_uso?: number;
  CONTRA?: string;
  REPRUTREP?: number;
  CONRUTLEC?: number;
  CONTIPMUL?: number;
  tipo_medicion_desc?: string;
  CONTIPULT?: number;
  PRELOCALI?: number;
}