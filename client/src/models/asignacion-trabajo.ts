export interface AsignacionTrabajo {
    id: number;
    codbrigada: string;
    codcliente: number;
    codinspector: string;
    fechareg: string;
    estado: string;
    observaciones: string;
    fecha_visita: string;
    codcreador: string;
}

export interface AsignacionTrabajoDto {
    id: number;
    codbrigada: string;
    codcliente: number;
    codinspector: string;
    fechareg: string;
    estado: string;
    observaciones: string;
    fecha_visita: string;
    codcreador: string;
}