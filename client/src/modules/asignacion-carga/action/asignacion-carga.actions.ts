import { FichaCatastroDto } from "@/models/fichacatastro";
import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { InspectorDto } from "@/models/inspector";
import { toast } from "sonner";
import { getData } from "@/service/data.actions";
import { buscarPorColumna } from "@/service/obtener-data-dinamico";

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
    sector?: string;
    manzana?: string;
    estadoPadron?: string;
}

/**
 * Función para asignar fichas a un grupo de trabajo
 * @param request - Datos de la asignación grupal
 * @returns Respuesta de la API
 */
export async function asignarFichasGrupal(request: AsignacionGrupalRequest): Promise<AsignacionGrupalResponse> {
    try {
        // TODO: Implementar llamada a la API
        // const response = await axios.post('/api/asignacion-carga/asignar-grupal', request);

        // Por ahora, simular respuesta exitosa
        console.log('Asignación Grupal:', request);

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success(`Asignación grupal programada para ${request.fichas.length} fichas al inspector ${request.codinspector}`);

        return {
            success: true,
            message: 'Asignación grupal programada exitosamente',
            data: request
        };
    } catch (error) {
        console.error('Error en asignación grupal:', error);
        toast.error('Error al programar la asignación grupal');

        return {
            success: false,
            message: 'Error al programar la asignación grupal'
        };
    }
}

/**
 * Función para asignar una ficha individual
 * @param fichaId - ID de la ficha a asignar
 * @param inspector - Inspector asignado
 * @returns Respuesta de la API
 */
export async function asignarFichaIndividual(fichaId: number, inspector: string): Promise<AsignacionGrupalResponse> {
    try {
        // TODO: Implementar llamada a la API
        // const response = await axios.post('/api/asignacion-carga/asignar-individual', { fichaId, inspector });

        console.log('Asignación Individual:', { fichaId, inspector });

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));

        toast.success('Ficha asignada exitosamente');

        return {
            success: true,
            message: 'Ficha asignada exitosamente',
            data: { fichaId, inspector }
        };
    } catch (error) {
        console.error('Error en asignación individual:', error);
        toast.error('Error al asignar la ficha');

        return {
            success: false,
            message: 'Error al asignar la ficha'
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
 * Función para obtener sectores disponibles
 * @returns Lista de sectores
 */
export async function getSectores(): Promise<{ value: string, label: string }[]> {
    try {
        // TODO: Implementar llamada a la API
        // const response = await axios.get('/api/sectores');

        // Datos de ejemplo
        return [
            { value: 'SEC001', label: 'Sector 1' },
            { value: 'SEC002', label: 'Sector 2' },
            { value: 'SEC003', label: 'Sector 3' }
        ];
    } catch (error) {
        console.error('Error al obtener sectores:', error);
        return [];
    }
}

/**
 * Función para obtener manzanas de un sector
 * @param sector - Código del sector
 * @returns Lista de manzanas
 */
export async function getManzanasPorSector(sector: string): Promise<{ value: string, label: string }[]> {
    try {
        // TODO: Implementar llamada a la API
        // const response = await axios.get(`/api/manzanas/${sector}`);

        console.log('Obteniendo manzanas para sector:', sector);

        // Datos de ejemplo
        return [
            { value: 'MZA001', label: 'Manzana A' },
            { value: 'MZA002', label: 'Manzana B' },
            { value: 'MZA003', label: 'Manzana C' }
        ];
    } catch (error) {
        console.error('Error al obtener manzanas:', error);
        return [];
    }
}

/**
 * Función para obtener estados de padrón
 * @returns Lista de estados
 */
export async function getEstadosPadron(): Promise<{ value: string, label: string }[]> {
    try {
        // Datos estáticos basados en los requisitos
        return [
            { value: 'null', label: 'Pendiente' },
            { value: 'P', label: 'Proceso' },
            { value: 'F', label: 'Finalizado' }
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