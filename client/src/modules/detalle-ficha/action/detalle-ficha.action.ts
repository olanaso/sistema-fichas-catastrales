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

// DTO para registrar unidad de uso
export interface RegistrarUnidadUsoDto {
    codcliente: number;
    tarifa: string;
    actividad: string;
    cantidad: string;
    razonsocial: string;
    referencia: string;
    idficha: number;
}

// Función para registrar una nueva unidad de uso
export async function registrarUnidadUso(data: RegistrarUnidadUsoDto): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const response = await apiClient.post('/fichas-catastrales/unidad-uso/registrar', data);
        
        if (response.data && response.data.success) {
            toast.success(response.data.message || 'Unidad de uso registrada exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al registrar la unidad de uso');
            return {
                success: false,
                error: response.data?.message || 'Error al registrar la unidad de uso'
            };
        }
    } catch (error: any) {
        console.error('Error al registrar unidad de uso:', error);
        const errorMessage = error.response?.data?.message || 'Error al registrar la unidad de uso';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// Función para eliminar unidad de uso por item
export async function eliminarUnidadUsoPorItem(item: string, idficha: number): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const response = await apiClient.delete(`/fichas-catastrales/unidad-uso/eliminar-por-item?item=${item}&idficha=${idficha}`);
        
        if (response.data && response.data.success) {
            toast.success(response.data.message || 'Unidad de uso eliminada exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al eliminar la unidad de uso');
            return {
                success: false,
                error: response.data?.message || 'Error al eliminar la unidad de uso'
            };
        }
    } catch (error: any) {
        console.error('Error al eliminar unidad de uso:', error);
        const errorMessage = error.response?.data?.message || 'Error al eliminar la unidad de uso';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// Función para eliminar todas las unidades de uso de una ficha
export async function eliminarUnidadUsoPorFicha(idficha: number): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const response = await apiClient.delete(`/fichas-catastrales/unidad-uso/eliminar-por-ficha?idficha=${idficha}`);
        
        if (response.data && response.data.success) {
            toast.success(response.data.message || 'Unidades de uso eliminadas exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al eliminar las unidades de uso');
            return {
                success: false,
                error: response.data?.message || 'Error al eliminar las unidades de uso'
            };
        }
    } catch (error: any) {
        console.error('Error al eliminar unidades de uso:', error);
        const errorMessage = error.response?.data?.message || 'Error al eliminar las unidades de uso';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// DTO para actualizar ficha catastral
export interface ActualizarFichaDto {
    idficha: number;
    columnas: string[];
    valores: string[];
}

// Función para actualizar ficha catastral
export async function actualizarFichaCatastro(data: ActualizarFichaDto): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const response = await apiClient.put('/fichas-catastrales/actualizar', data);
        
        if (response.data && response.data.success) {
            toast.success(response.data.message || 'Ficha catastral actualizada exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al actualizar la ficha catastral');
            return {
                success: false,
                error: response.data?.message || 'Error al actualizar la ficha catastral'
            };
        }
    } catch (error: any) {
        console.error('Error al actualizar ficha catastral:', error);
        const errorMessage = error.response?.data?.message || 'Error al actualizar la ficha catastral';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// Función para establecer ficha como parcial
export async function establecerFichaParcial(idficha: number, codUsuario: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const data: ActualizarFichaDto = {
            idficha,
            columnas: ['estadoficha', 'fechamodificacion', 'usermodificador'],
            valores: ['P', 'now()', codUsuario]
        };

        const response = await apiClient.put('/fichas-catastrales/actualizar', data);
        
        if (response.data && response.data.success) {
            toast.success('Ficha establecida como parcial exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al establecer ficha como parcial');
            return {
                success: false,
                error: response.data?.message || 'Error al establecer ficha como parcial'
            };
        }
    } catch (error: any) {
        console.error('Error al establecer ficha como parcial:', error);
        const errorMessage = error.response?.data?.message || 'Error al establecer ficha como parcial';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// Función para finalizar ficha
export async function finalizarFicha(idficha: number, codUsuario: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const data: ActualizarFichaDto = {
            idficha,
            columnas: ['estadoficha', 'fechaaprobacion', 'usermodificador', 'fichaaprobada'],
            valores: ['F', 'now()', codUsuario, '1']
        };

        const response = await apiClient.put('/fichas-catastrales/actualizar', data);
        
        if (response.data && response.data.success) {
            toast.success('Ficha finalizada exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al finalizar la ficha');
            return {
                success: false,
                error: response.data?.message || 'Error al finalizar la ficha'
            };
        }
    } catch (error: any) {
        console.error('Error al finalizar ficha:', error);
        const errorMessage = error.response?.data?.message || 'Error al finalizar la ficha';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
}

// Función para observar ficha
export async function observarFicha(idficha: number, codUsuario: string, observacion: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const data: ActualizarFichaDto = {
            idficha,
            columnas: ['estadoficha', 'fechaobservacion', 'usermodificador', 'detalleobservacion'],
            valores: ['O', 'now()', codUsuario, observacion]
        };

        const response = await apiClient.put('/fichas-catastrales/actualizar', data);
        
        if (response.data && response.data.success) {
            toast.success('Ficha observada exitosamente');
            return {
                success: true,
                message: response.data.message
            };
        } else {
            toast.error(response.data?.message || 'Error al observar la ficha');
            return {
                success: false,
                error: response.data?.message || 'Error al observar la ficha'
            };
        }
    } catch (error: any) {
        console.error('Error al observar ficha:', error);
        const errorMessage = error.response?.data?.message || 'Error al observar la ficha';
        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    }
} 


