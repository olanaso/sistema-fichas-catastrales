export interface PadronHistorico {
  codpadron: string;
  creador: string;
  fecha_importacion: string; // timestamp en string ISO
  cantidad_registros: number;
  estado: string;
  observacion?: string;
} 