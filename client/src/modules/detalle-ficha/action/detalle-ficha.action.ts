import apiClient from "@/lib/axios";
import { toast } from "sonner";

// DTO de respuesta para el detalle de ficha
export interface DetalleFichaResponse {
    // Datos del inmueble/predio
    region: string;
    sucursal: string;
    sector: string;
    mzna: string;
    lote: string;
    sublote: string;
    suministro: number;
    calle: string;
    cuadra: string;
    nromuni: string;
    mzmuni: string;
    ltmuni: string;
    urbanizacion: string;
    tipoconstruccion: string;
    nropisos: string;
    tiposervicio_campo: string;
    abastecimiento: string;
    piscina: string;
    almacenaje: string;
    
    // Datos del usuario
    tipousuario: string;
    apellidosnombre_campo: string;
    dni: string;
    habitantes: string;
    tiporesponsable: string;
    telefono: string;
    nrocontrato: string | null;
    reservorio: string;
    sectabastecimiento: string;
    categoriascampo: string | null;
    actividades: string;
    razonsocial: string;
    
    // Datos de conexión de agua
    estservicio_a: string;
    pavimento_a: string;
    vereda_a: string;
    diametrocampo_a: string;
    materialtubo_a: string;
    tipoingreso_a: string;
    caja_a: string;
    materialcaja_a: string;
    localizacion_a: string;
    estadocaja_a: string;
    tapa_a: string;
    materialtapa_a: string;
    estadotapa_a: string;
    llaves: string;
    posicionmedidor: string;
    tipocorte_a: string;
    razoncorte: string;
    fugas_a: string;
    tipocajaobserv_a: string;
    
    // Datos del medidor
    tienemedidor: string;
    medidorcampo: string;
    modelomedidor: string;
    anio: string;
    lecturamedidor: number;
    fechainstalacion: string;
    marcamedidor: string;
    diametromedidor: string;
    lectura: number | null;
    tipofacturacion: string | null;
    tipolectura: string;
    estadomedidor: string;
    medidoroperativo: string;
    
    // Datos de conexión de desagüe
    estservicio_d: string;
    diametrocampo_d: string;
    materialtubo_d: string;
    caja_d: string;
    materialcaja_d: string;
    localizacion_d: string;
    estadocaja_d: string;
    tapa_d: string;
    tipotapa_d: string;
    estadotapa_d: string;
    fugas_d: string;
    horasxdia: string;
    diasxsemana: string;
    presionagu: string;
    nrolavatorios: number;
    estadolavatorios: string;
    nrolavadoras: number;
    estadolavadoras: string;
    nrowater: number;
    estadowater: string;
    nroduchas: number;
    estadoduchas: string;
    nrourinarios: number;
    estadourinarios: string;
    nrogrifos: number;
    estadogrifos: string;
    nropiscina: number;
    estadopiscina: string;
    nrotanquecisterna: number;
    estadotanquecisterna: string;
    nrotanqueelevado: number;
    estadotanqueelevado: string;
    
    // Calidad de servicio y observaciones
    observacion: string;
    fichaincompleta: string;
    tipoacccomercial: string;
    
    // Datos de encuesta y supervisión
    encuestador: string;
    fecencuestador: string;
    calidad: string;
    feccalidad: string;
    supervisor: string;
    fecsupervisor: string;
    supervision: string;
    fecsupervision: string;
    
    // Datos adicionales
    objectid: number;
    posicionx: string;
    posiciony: string;
    usermodificador: string;
    fechamodificacion: string;
    codcatastral: string;
    coddist: string;
    codsector_new: string;
    codmza_new: string;
    nrolote_new: string;
    nrosublote_new: string;
    propietario: string;
    fecha: string;
    fotofachada: string;
    fotocajaagua: string;
    fotocajadesague: string;
    nromed_sistema: string | null;
    medidalotefrente: number;
    medidaejeagua: number;
    medidaejedesague: number;
    fichaaprobada: number;
    fechaaprobacion: string | null;
    codcalle: number;
    codurbaso: string;
    actividad: string | null;
    catetar: string | null;
    desactividad: string | null;
    descatetar: string | null;
    unidades_uso: string | null;
    fotodetalle4: string;
    fotodetalle5: string;
}

export async function getDetalleFicha(codFicha: number): Promise<{ success: boolean; data?: DetalleFichaResponse; error?: string }> {
    try {
        const response = await apiClient.get(`/fichas-catastrales/obtener-detalle?codficha=${codFicha}`);
        
        if (response.data) {
            return {
                success: true,
                data: response.data
            };
        } else {
            return {
                success: false,
                error: 'No se encontraron datos de la ficha'
            };
        }
    } catch (error: any) {
        console.error('Error al obtener detalle de ficha:', error);
        toast.error('Error al cargar el detalle de la ficha');
        return {
            success: false,
            error: error.response?.data?.message || 'Error al obtener el detalle de la ficha'
        };
    }
}

export async function getTarifas(idficha: number, codcliente: number): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const response = await apiClient.get(`/fichas-catastrales/obtener-tarifas?idficha=${idficha}&codcliente=${codcliente}`);
        
        if (response.data) {
            return {
                success: true,
                data: response.data
            };
        } else {
            return {
                success: false,
                error: 'No se encontraron tarifas'
            };
        }
    } catch (error: any) {
        console.error('Error al obtener tarifas:', error);
        toast.error('Error al cargar las tarifas');
        return {
            success: false,
            error: error.response?.data?.message || 'Error al obtener las tarifas'
        };
    }
} 


