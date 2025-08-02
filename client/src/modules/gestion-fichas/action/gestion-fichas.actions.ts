import { FichaCatastro, FichaCatastroDto, CreateFichaCatastroRequest, UpdateFichaCatastroRequest } from '@/models/fichacatastro';
import { toast } from 'sonner';
import { getData, buscarExacto } from "@/service/data.actions";
import { ComboboxOption } from "@/types/combobox";
import apiClient from "@/lib/axios";
import { Inspector } from '@/models/inspector';
import { GrupoTrabajo } from '@/models/grupotrabajo';

export interface FiltrosGestionFichas {
    grupo?: string;
    inspector?: string;
    fechaInicio?: string;
    fechaFin?: string;
    estado?: string;
}

/**
 * Editar una ficha catastral
 * @param id - ID de la ficha
 * @param data - Datos de la ficha a actualizar
 * @returns Promise con el resultado de la operación
 */
export async function editarFicha(id: number, data: UpdateFichaCatastroRequest): Promise<{ success: boolean; message?: string; data?: FichaCatastro }> {
    try {
        // TODO: Implementar lógica de edición
        // const response = await apiClient.put(`/fichas/${id}`, data);

        toast.success('Funcionalidad de edición pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de edición pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al editar ficha:', error);
        toast.error('Error al editar la ficha');

        return {
            success: false,
            message: error.message || 'Error al editar la ficha'
        };
    }
}

/**
 * Eliminar una ficha catastral
 * @param id - ID de la ficha
 * @returns Promise con el resultado de la operación
 */
export async function eliminarFicha(id: number): Promise<{ success: boolean; message?: string }> {
    try {
        // TODO: Implementar lógica de eliminación
        // const response = await apiClient.delete(`/fichas/${id}`);

        toast.success('Funcionalidad de eliminación pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de eliminación pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al eliminar ficha:', error);
        toast.error('Error al eliminar la ficha');

        return {
            success: false,
            message: error.message || 'Error al eliminar la ficha'
        };
    }
}

/**
 * Imprimir una ficha catastral
 * @param id - ID de la ficha
 * @returns Promise con el resultado de la operación
 */
export async function imprimirFicha(id: number): Promise<{ success: boolean; message?: string }> {
    try {
        // TODO: Implementar lógica de impresión
        // const response = await apiClient.post(`/fichas/${id}/imprimir`);

        toast.success('Funcionalidad de impresión pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de impresión pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al imprimir ficha:', error);
        toast.error('Error al imprimir la ficha');

        return {
            success: false,
            message: error.message || 'Error al imprimir la ficha'
        };
    }
}

/**
 * Migrar una ficha catastral
 * @param id - ID de la ficha
 * @returns Promise con el resultado de la operación
 */
export async function migrarFicha(id: number): Promise<{ success: boolean; message?: string }> {
    try {
        // TODO: Implementar lógica de migración
        // const response = await apiClient.post(`/fichas/${id}/migrar`);

        toast.success('Funcionalidad de migración pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de migración pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al migrar ficha:', error);
        toast.error('Error al migrar la ficha');

        return {
            success: false,
            message: error.message || 'Error al migrar la ficha'
        };
    }
}

/**
 * Aprobar una ficha catastral
 * @param id - ID de la ficha
 * @returns Promise con el resultado de la operación
 */
export async function aprobarFicha(id: number): Promise<{ success: boolean; message?: string }> {
    try {
        // TODO: Implementar lógica de aprobación
        // const response = await apiClient.post(`/fichas/${id}/aprobar`);

        toast.success('Funcionalidad de aprobación pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de aprobación pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al aprobar ficha:', error);
        toast.error('Error al aprobar la ficha');

        return {
            success: false,
            message: error.message || 'Error al aprobar la ficha'
        };
    }
}

/**
 * Crear una nueva ficha catastral
 * @param data - Datos de la ficha a crear
 * @returns Promise con el resultado de la operación
 */
export async function crearFicha(data: CreateFichaCatastroRequest): Promise<{ success: boolean; message?: string; data?: FichaCatastro }> {
    try {
        // TODO: Implementar lógica de creación
        // const response = await apiClient.post('/fichas', data);

        toast.success('Funcionalidad de creación pendiente de implementación');

        return {
            success: false,
            message: 'Funcionalidad de creación pendiente de implementación'
        };
    } catch (error: any) {
        console.error('Error al crear ficha:', error);
        toast.error('Error al crear la ficha');

        return {
            success: false,
            message: error.message || 'Error al crear la ficha'
        };
    }
} 

/**
 * Función para obtener grupos de trabajo
 * @returns Lista de grupos de trabajo
 */
export async function getGruposTrabajo(): Promise<ComboboxOption[]> {
    try {
        const response = await getData("usp_grupotrabajo");
        
        if (response.success) {
            return response.data.map((grupo: GrupoTrabajo) => ({
                value: grupo.codgrupo,
                label: `${grupo.nombre} (${grupo.codgrupo})`
            }));
        }
        
        console.error('Error al obtener grupos de trabajo:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener grupos de trabajo:', error);
        return [];
    }
}

/**
 * Función para obtener inspectores
 * @returns Lista de inspectores
 */
export async function getInspectores(): Promise<ComboboxOption[]> {
    try {
        const response = await getData("inspectores");
        
        if (response.success) {
            return response.data.map((inspector: any) => ({
                value: inspector.codinspector,
                label: `${inspector.nombre} ${inspector.apellido} (${inspector.codinspector})`
            }));
        }
        
        console.error('Error al obtener inspectores:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener inspectores:', error);
        return [];
    }
}

/**
 * Función para obtener estados de fichas
 * @returns Lista de estados
 */
export async function getEstadosFichas(): Promise<ComboboxOption[]> {
    try {
        // Datos estáticos basados en los estados comunes de fichas catastrales
        return [
            { value: 'PENDIENTE', label: 'Fichas Pendientes' },
            { value: 'PARCIAL', label: 'Fichas Parciales' },
            { value: 'OBSERVADO', label: 'Fichas Observadas' },
            { value: 'FINALIZADO', label: 'Fichas Finalizadas' }
        ];
    } catch (error) {
        console.error('Error al obtener estados de fichas:', error);
        return [];
    }
}

/**
 * Función para obtener inspectores por grupo de trabajo
 * @param codgrupo - Código del grupo de trabajo
 * @returns Lista de inspectores del grupo
 */
export async function getInspectoresPorGrupo(codgrupo: string): Promise<ComboboxOption[]> {
    try {
        const response = await buscarExacto("inspectores", ["codbrigada"], [codgrupo]);
        
        if (response.success) {
            return response.data.map((inspector: Inspector) => ({
                value: inspector.codinspector,
                label: `${inspector.nombres}`
            }));
        }
        
        console.error('Error al obtener inspectores por grupo:', response.message);
        return [];
    } catch (error) {
        console.error('Error al obtener inspectores por grupo:', error);
        return [];
    }
} 

/**
 * Función para obtener fichas catastrales filtradas por columnas específicas
 * @param columnas - Array de nombres de columnas de la base de datos
 * @param valores - Array de valores correspondientes a las columnas
 * @returns Lista de fichas catastrales filtradas
 */
export async function getFichasCatastralesPorColumnas(columnas: string[], valores: string[]): Promise<FichaCatastro[]> {
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
        
        const response = await apiClient.get(`/fichas-catastrales/buscar?${columnasParam}&${valoresParam}`);

        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        if (Array.isArray(responseData)) {
            return responseData as FichaCatastro[];
        } else if (responseData && Array.isArray(responseData.data)) {
            return responseData.data as FichaCatastro[];
        }

        console.warn('Formato de respuesta inesperado:', responseData);
        return [];
    } catch (error: any) {
        console.error(`Error al obtener fichas catastrales filtradas:`, error);
        toast.error('Error al obtener fichas catastrales');
        return [];
    }
}

/**
 * Función para obtener fichas catastrales con filtros específicos de gestión
 * @param filtros - Filtros de gestión de fichas
 * @returns Lista de fichas catastrales filtradas
 */
export async function getFichasConFiltrosGestion(filtros: FiltrosGestionFichas): Promise<FichaCatastro[]> {
    try {
        // Definir las columnas de la base de datos correspondientes a los filtros
        const columnas = ["codbrigada", "inspector", "fecha_inicio", "fecha_fin", "estadoficha"];
        
        // Obtener los valores correspondientes de los filtros
        const valores = [
            filtros.grupo || "",
            filtros.inspector || "",
            filtros.fechaInicio || "",
            filtros.fechaFin || "",
            filtros.estado || "",
        ];

        // Filtrar solo las columnas que tienen valores
        const columnasConValores = columnas.filter(
            (_, index) => valores[index] && valores[index].trim() !== ""
        );
        const valoresFiltrados = valores.filter(
            (valor) => valor && valor.trim() !== ""
        );

        if (columnasConValores.length === 0) {
            console.warn("No se proporcionaron filtros válidos");
            return [];
        }

        // Manejar fechas de manera especial
        const columnasFinales: string[] = [];
        const valoresFinales: string[] = [];

        columnasConValores.forEach((columna, index) => {
            if (columna === "fecha_creacion" && valoresFiltrados[index]) {
                // Si es fecha de inicio
                if (filtros.fechaInicio && !filtros.fechaFin) {
                    columnasFinales.push("fecha_creacion");
                    valoresFinales.push(`>=${valoresFiltrados[index]}`);
                }
                // Si es fecha de fin
                else if (filtros.fechaFin && !filtros.fechaInicio) {
                    columnasFinales.push("fecha_creacion");
                    valoresFinales.push(`<=${valoresFiltrados[index]}`);
                }
                // Si ambas fechas están presentes
                else if (filtros.fechaInicio && filtros.fechaFin) {
                    columnasFinales.push("fecha_creacion");
                    valoresFinales.push(`${filtros.fechaInicio} TO ${filtros.fechaFin}`);
                }
            } else {
                columnasFinales.push(columna);
                valoresFinales.push(valoresFiltrados[index]);
            }
        });

        return await getFichasCatastralesPorColumnas(columnasFinales, valoresFinales);
    } catch (error) {
        console.error('Error al obtener fichas con filtros de gestión:', error);
        toast.error('Error al aplicar filtros');
        return [];
    }
} 

/**
 * Descargar ficha catastral en formato Word
 * @param id - ID de la ficha
 * @returns Promise con el resultado de la operación
 */
export async function descargarFichaDoc(id: number): Promise<{ success: boolean; message?: string }> {
    try {
        const response = await apiClient.get(`/ficha-catastral/docx3`, {
            responseType: 'blob',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        });

        // Crear un blob con los datos del archivo
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        // Crear URL del blob
        const url = window.URL.createObjectURL(blob);

        // Crear elemento de enlace temporal
        const link = document.createElement('a');
        link.href = url;
        link.download = `ficha-catastral-${id}.docx`;

        // Agregar al DOM, hacer clic y limpiar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Liberar la URL del blob
        window.URL.revokeObjectURL(url);

        toast.success('Ficha descargada exitosamente');
        return { success: true };
    } catch (error: any) {
        console.error('Error al descargar ficha:', error);
        toast.error('Error al descargar la ficha');
        return {
            success: false,
            message: error.message || 'Error al descargar la ficha'
        };
    }
}
