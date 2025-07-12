export interface Inspector {
  codemp: string;
  codsede: string;
  codinspector: string;
  nombres: string;
  asignadoareclamos: number;
  estareg: number;
  creador: string;
  fechareg: string;
  asignadoalectura: number;
  asignadoacalibradormed: number;
  dni: string;
  codoficina: string;
  clave: string;
  login: string;
  reaperturamovil: number;
  asignadoacortes: number;
  supervisor: number;
  asignadoconsultas: number;
  proyectocatastro: string;
  asignadocatastro: number;
  asignadoinspecciones: number;
  asignadoareapertura: number;
  asignadoanotificaciones: number;
  asignadoparquemedidores: number;
  asignadofactibilidad: number;
  asignadoincidenciacampo: number;
  asignadoordendepago: number;
  asignadoentregarecibo: number;
  asignadoalcencegeneral: number;
  asignadocatastroreal: number;
  codbrigada: string;
}

export interface InspectorDto {
  codemp: string;
  codsede: string;
  codinspector: string;
  nombres: string;
  asignadoareclamos: number;
  estareg: number;
  creador: string;
  fechareg: string;
  asignadoalectura: number;
  asignadoacalibradormed: number;
  dni: string;
  codoficina: string;
  clave: string;
  login: string;
  reaperturamovil: number;
  asignadoacortes: number;
  supervisor: number;
  asignadoconsultas: number;
  proyectocatastro: string;
  asignadocatastro: number;
  asignadoinspecciones: number;
  asignadoareapertura: number;
  asignadoanotificaciones: number;
  asignadoparquemedidores: number;
  asignadofactibilidad: number;
  asignadoincidenciacampo: number;
  asignadoordendepago: number;
  asignadoentregarecibo: number;
  asignadoalcencegeneral: number;
  asignadocatastroreal: number;
  codbrigada: string;
}

// Funciones de utilidad para inspectores
export const isSupervisor = (inspector: InspectorDto | null): boolean => {
  return inspector?.supervisor === 1;
};

export const isActive = (inspector: InspectorDto | null): boolean => {
  return inspector?.estareg === 1;
};

export const getInspectorFullName = (inspector: InspectorDto | null): string => {
  if (!inspector) return "Inspector";
  return inspector.nombres || "Sin nombre";
};

export const getInspectorCode = (inspector: InspectorDto | null): string => {
  if (!inspector) return "";
  return `${inspector.codemp}-${inspector.codsede}-${inspector.codinspector}`;
}; 