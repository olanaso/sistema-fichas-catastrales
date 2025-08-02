export interface Tarifa {
    codemp: string;                // varchar(3)
    codsuc: string;                // varchar(3)
    catetar: string;              // varchar(3)
    tipocon?: string | null;      // varchar(3)
    coddiametro?: string | null;  // varchar(3)
    nomtar: string;               // varchar(30)
    volumesp?: number | null;     // numeric(16,6)
    volummin?: number | null;     // numeric(16,6)
    impconsmin?: number | null;   // numeric(16,6)
    impconsexc?: number | null;   // numeric(16,6)
    rangoinicial?: string | null; // varchar(50)
    rangointermedio?: string | null; // varchar(50)
    rangofinal?: string | null;   // varchar(50)
    tipocategoria: string;        // bpchar(1)
    estareg?: number;             // int2
    creador: string;              // varchar(20)
    fechareg?: string;            // timestamp (ISO string)
    tiposubcategoria?: number | null; // int2
    hastarango1?: number | null; // numeric(16,6)
    hastarango2?: number | null; // numeric(16,6)
    hastarango3?: number | null; // numeric(16,6)
    impconsmindesa?: number | null; // numeric(16,6)
    impconsexcdesa?: number | null; // numeric(16,6)
    impconsmedio?: number | null;   // numeric(16,6)
    impconsmediodesa?: number | null; // numeric(16,6)
    codsicap?: string | null;     // varchar(3)
    impedimento?: number;         // int2
    promedioauto?: number;        // int2
    codsunat?: string | null;     // varchar(4)
    det_urgencia?: number;        // int2
    subsidio?: number;            // int2
    beneficiario?: number;        // int2
    orden?: number | null;        // int2
    coddist?: string | null;      // varchar(2)
  }
  

  export interface TarifaFicha {
    tarifa: string;              // Código de tarifa (ej. '001')
    actividad: string;           // Actividad registrada (ej. 'Comercio')
    razonsocial: string;         // Nombre o razón social
    referencia: string;          // Referencia de ubicación
    item: number;                // ID único del item (autogenerado)
    nombre_tarifa: string;       // Nombre de la tarifa (ej. 'Comercial B')
    nombre_categoria: string;    // Descripción de la categoría (ej. 'No Doméstica')
    tipocategoria: string;       // Código de la categoría (ej. 'B')
  }