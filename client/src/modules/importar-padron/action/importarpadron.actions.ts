import apiClient from "@/lib/axios";
import { PadronHistorico } from "@/models/padronhistorico";
import { ImportFormValues } from "../components/form/import-form";

// Función para obtener datos de cualquier tabla
export async function getImportarPadronClientes(page: number = 0, size: number = 10) {
  try {
    // Convertir page a offset (page * size)
    const offset = page * size;
    const response = await apiClient.get(`/tipos/obtener-paginado?tabla=vw_datamigra&limit=${size}&offset=${offset}`);
    
    // El backend devuelve un string JSON, necesitamos parsearlo
    const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    
    return {
      success: true,
      data: {
        data: responseData.data || [], // Array de datos
        total: responseData.total || 0, // Total de elementos
        page: page, // Página actual
        size: size, // Elementos por página
        totalPages: Math.ceil((responseData.total || 0) / size) // Total de páginas
      },
      message: 'Importar padrón de clientes obtenidos exitosamente'
    };
  } catch (error: any) {
    console.error('Error en getImportarPadronClientes:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener importar padrón de clientes',
      message: error.response?.data?.message || 'Error al obtener importar padrón de clientes',
      data: {
        data: [],
        total: 0,
        page: page,
        size: size,
        totalPages: 0
      }
    };
  }
}

// Función para obtener el último registro del historial de importación
export async function getHistorialImportarPadronClientes(): Promise<PadronHistorico | null> {
  try {
    const response = await apiClient.get(`/tipos/obtener-paginado?tabla=usp_padronhistorico&limit=1&offset=0`);
    const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    const data = responseData.data || [];
    return data.length > 0 ? data[0] as PadronHistorico : null;
  } catch (error: any) {
    console.error('Error en getHistorialImportarPadronClientes:', error);
    return null;
  }
}

export async function importarPadronClientes(dto: ImportFormValues) {
  try {
    const response = await apiClient.post(`/cliente/importar`, dto);
    return response.data;
  } catch (error: any) {
    console.error('Error en importarPadronClientes:', error);
    return null;
  }
}