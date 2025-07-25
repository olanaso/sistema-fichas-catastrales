export interface FichaCatastralUnidadUso {
  codemp: string;
  codcliente: number;
  tarifa?: string;
  actividad?: string;
  cantidad: number;
  item?: number;
  fechareg?: Date;
  estareg?: number;
  razonsocial?: string;
  referencia?: string;
  idficha?: number;
  tiporeg?: string;
}

export interface CreateFichaCatastralUnidadUso {
  codemp: string;
  codcliente: number;
  tarifa?: string;
  actividad?: string;
  cantidad: number;
  razonsocial?: string;
  referencia?: string;
  idficha?: number;
  tiporeg?: string;
}

export interface UpdateFichaCatastralUnidadUso {
  codemp?: string;
  codcliente?: number;
  tarifa?: string;
  actividad?: string;
  cantidad?: number;
  razonsocial?: string;
  referencia?: string;
  idficha?: number;
  tiporeg?: string;
  estareg?: number;
}
