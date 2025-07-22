import { FichaCatastro, FichaCatastroDto } from "@/models/fichacatastro";
import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { InspectorDto } from "@/models/inspector";
import { Sector, Manzana, Sucursal } from "@/models/tipos";
import { toast } from "sonner";
import { getData, buscarExacto } from "@/service/data.actions";
import { buscarPorColumna } from "@/service/obtener-data-dinamico";
import { ComboboxOption } from "@/types/combobox";
import { UsuarioDto } from "@/models/usuario";
import apiClient from "@/lib/axios";
import { Cliente } from "@/models/cliente";

// Interfaces para la asignación
export interface AsignacionGrupalRequest {
    fichas: number[]; // IDs de fichas seleccionadas
    codgrupo: string; // Código del grupo de trabajo
    codinspector: string; // Código del inspector asignado
    observacion: string; // Observaciones de la asignación
    fecha_visita: string; // Fecha de visita programada
}

export interface AsignacionGrupalResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface FiltrosAsignacion {
    sucursal?: string;
    sector?: string;
    manzana?: string;
    estadoRegistro?: string;
}

// Interfaces para los DTOs de asignación
export interface FichaUpdateDto {
    idficha: number;
    inspector: string;
    encuestador: string;
    fechaVisita: string; // LocalDate en formato ISO
    observacion?: string;
    codbrigada: string;
}

export interface FichaUpdateMasivoDto {
    idfichas: number[];
    inspector: string;
    encuestador: string;
    fechaVisita: string; // LocalDate en formato ISO
    observacion?: string;
    codbrigada: string;
}

/**
 * Función para asignar una ficha individual
 * @param dto - Datos de la asignación individual
 * @returns Respuesta de la API
 */
export async function asignarFichaIndividual(dto: FichaUpdateDto): Promise<AsignacionGrupalResponse> {
    try {
        const response = await apiClient.put('/fichas-catastrales/asignacion', dto);

        if (response.data.success) {
            toast.success('Ficha asignada exitosamente');
            return {
                success: true,
                message: 'Ficha asignada exitosamente',
                data: response.data
            };
        } else {
            toast.error(response.data.error || 'Error al asignar la ficha');
            return {
                success: false,
                message: response.data.error || 'Error al asignar la ficha'
            };
        }
    } catch (error: any) {
        console.error('Error al asignar ficha individual:', error);
        toast.error('Error al asignar la ficha');
        return {
            success: false,
            message: error.response?.data?.error || 'Error al asignar la ficha'
        };
    }
}

/**
 * Función para asignar fichas masivamente
 * @param dto - Datos de la asignación masiva
 * @returns Respuesta de la API
 */
export async function asignarFichasMasivo(dto: FichaUpdateMasivoDto): Promise<AsignacionGrupalResponse> {
    try {
        const response = await apiClient.put('/fichas-catastrales/asignacion-masiva', dto);

        if (response.data.success) {
            toast.success(`Asignación masiva completada para ${dto.idfichas.length} fichas`);
            return {
                success: true,
                message: `Asignación masiva completada para ${dto.idfichas.length} fichas`,
                data: response.data
            };
        } else {
            toast.error(response.data.error || 'Error en la asignación masiva');
            return {
                success: false,
                message: response.data.error || 'Error en la asignación masiva'
            };
        }
    } catch (error: any) {
        console.error('Error en asignación masiva:', error);
        toast.error('Error en la asignación masiva');
        return {
            success: false,
            message: error.response?.data?.error || 'Error en la asignación masiva'
        };
    }
}

/**
 * Función para obtener fichas con filtros
 * @param filtros - Filtros de búsqueda
 * @returns Lista de fichas filtradas
 */
export async function getFichasConFiltros(filtros: FiltrosAsignacion): Promise<FichaCatastroDto[]> {
    try {
        // TODO: Implementar llamada a la API con filtros
        // const response = await axios.get('/api/fichas-catastro/filtrar', { params: filtros });

        console.log('Filtros aplicados:', filtros);

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));

        return [];
    } catch (error) {
        console.error('Error al obtener fichas filtradas:', error);
        toast.error('Error al aplicar filtros');
        return [];
    }
}

/**
 * Función para obtener todas las sucursales
 * @returns Lista de sucursales
 */
export async function getSucursales(): Promise<ComboboxOption[]> {
    try {
        const response = await getData("sucursales");
        
        if (response.success) {
            return response.data.map((sucursal: Sucursal) => ({
                value: sucursal.codsuc,
                label: `${sucursal.nombre} (${sucursal.codsuc})`
            }));
        }
        
        console.error('Error al obtener sucursales:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        return [];
    }
}

/**
 * Función para obtener sectores por sucursal
 * @param codsuc - Código de la sucursal
 * @returns Lista de sectores de la sucursal
 */
export async function getSectoresPorSucursal(codsuc: string): Promise<ComboboxOption[]> {
    try {
        const response = await buscarExacto("sectores", ["codsuc"], [codsuc]);
        
        if (response.success) {
            return response.data.map((sector: Sector) => ({
                value: sector.codsector,
                label: `${sector.descripcion} (${sector.codsector})`
            }));
        }
        
        console.error('Error al obtener sectores por sucursal:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener sectores por sucursal:', error);
        return [];
    }
}

/**
 * Función para obtener manzanas por sector y sucursal
 * @param codsuc - Código de la sucursal
 * @param codsector - Código del sector
 * @returns Lista de manzanas del sector
 */
export async function getManzanasPorSector(codsuc: string, codsector: string): Promise<ComboboxOption[]> {
    try {
        const response = await buscarExacto("manzanas", ["codsuc", "codsector"], [codsuc, codsector]);
        
        if (response.success) {
            return response.data.map((manzana: Manzana) => ({
                value: manzana.codmza,
                label: `${manzana.descripcion || manzana.codmza} (${manzana.codmza})`
            }));
        }
        
        console.error('Error al obtener manzanas por sector:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener manzanas por sector:', error);
        return [];
    }
}

/**
 * Función para obtener sectores disponibles (mantener compatibilidad)
 * @returns Lista de sectores
 */
export async function getSectores(): Promise<ComboboxOption[]> {
    try {
        const response = await getData("sectores");
        
        if (response.success) {
            return response.data.map((sector: Sector) => ({
                value: sector.codsector,
                label: `${sector.descripcion} (${sector.codsector})`
            }));
        }
        
        console.error('Error al obtener sectores:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener sectores:', error);
        return [];
    }
}

/**
 * Función para obtener estados de padrón
 * @returns Lista de estados
 */
export async function getEstadosPadron(): Promise<ComboboxOption[]> {
    try {
        // Datos estáticos basados en los requisitos
        return [
            { value: 'SIN ASIGNAR', label: 'Sin asignar' },
            { value: 'ASIGNADO', label: 'Asignado' },
        ];
    } catch (error) {
        console.error('Error al obtener estados de padrón:', error);
        return [];
    }
}

/**
 * Función para obtener inspectores por código de brigada
 * @param codbrigada - Código de la brigada (mismo que codgrupo)
 * @returns Lista de inspectores de la brigada
 */
export async function getInspectoresByBrigada(codbrigada: string): Promise<InspectorDto[]> {
    try {
        // Usar buscarPorColumna para obtener inspectores filtrados por codbrigada
        const inspectores = await buscarPorColumna<InspectorDto>(
            "inspectores",
            "codbrigada",
            codbrigada
        );

        // Filtrar solo inspectores activos
        return inspectores.filter(inspector => inspector.estareg === 1);
    } catch (error) {
        console.error('Error al obtener inspectores por brigada:', error);
        return [];
    }
}

/**
 * Función para obtener todos los grupos de trabajo
 * @returns Lista de grupos de trabajo
 */
export async function getGruposTrabajo(): Promise<GrupoTrabajoDto[]> {
    try {
        const response = await getData("usp_grupotrabajo");

        if (response.success) {
            // Filtrar solo grupos activos
            return response.data.filter((grupo: GrupoTrabajoDto) => grupo.activo);
        }

        console.error('Error al obtener grupos de trabajo:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener grupos de trabajo:', error);
        return [];
    }
} 


/**
 * Función para obtener fichas catastrales filtradas por columnas específicas
 * @param columnas - Array de nombres de columnas de la base de datos
 * @param valores - Array de valores correspondientes a las columnas
 * @returns Lista de fichas catastrales filtradas
 */
export async function getFichasCatastralesPorColumnas(columnas: string[], valores: string[]): Promise<Cliente[]> {
    try {
        if (columnas.length === 0 || valores.length === 0) {
            console.warn('No se proporcionaron columnas o valores para filtrar');
            return [];
        }

        if (columnas.length !== valores.length) {
            console.error('El número de columnas y valores no coincide');
            return [];
        }

        // Construir los parámetros de consulta para las listas
        const columnasParam = columnas.map(col => `columnas=${encodeURIComponent(col)}`).join('&');
        const valoresParam = valores.map(val => `valores=${encodeURIComponent(val)}`).join('&');
        
        const response = await apiClient.get(`/cliente/buscar?${columnasParam}&${valoresParam}`);

        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        if (Array.isArray(responseData)) {
            return responseData as Cliente[];
        } else if (responseData && Array.isArray(responseData.data)) {
            return responseData.data as Cliente[];
        }

        console.warn('Formato de respuesta inesperado:', responseData);
        return [];
    } catch (error: any) {
        console.error(`Error al obtener fichas catastrales filtradas:`, error);
        toast.error('Error al obtener fichas catastrales');
        return [];
    }
}