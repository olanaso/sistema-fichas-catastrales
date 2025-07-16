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
