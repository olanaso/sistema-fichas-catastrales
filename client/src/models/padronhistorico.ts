export interface PadronHistorico {
  codpadron: number;
  creador: string;
  fechareg: string; // timestamp en string ISO
  cantidad_registros: number;
  estado: string;
  tablacliente_bk: string;
  tablauduso_bk: string;
  observacion?: string;
} 