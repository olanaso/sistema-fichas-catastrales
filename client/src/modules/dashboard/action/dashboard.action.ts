import apiClient from "@/lib/axios";
import { Sucursal } from "@/models/modulos";
import { toast } from "sonner";

// Interfaces para las estadísticas
export interface DashboardStats {
  // Fichas Catastrales
  totalFichas: number;
  fichasPendientes: number;
  fichasParciales: number;
  fichasFinalizadas: number;
  fichasObservadas: number;
  totalClientes: number;
}

// Función para obtener cantidad por filtros usando el nuevo endpoint
export async function obtenerCantidadPorFiltros(
  tabla: string, 
  columnas: string[], 
  valores: string[]
): Promise<{ success: boolean; cantidad?: number; error?: string }> {
  try {
    const params = new URLSearchParams();
    params.append('tabla', tabla);
    columnas.forEach(col => params.append('columnas', col));
    valores.forEach(val => params.append('valores', val));

    const response = await apiClient.get(`/tipos/obtener-cantidad?${params.toString()}`);
    
    if (response.data && response.data.success) {
      return {
        success: true,
        cantidad: response.data.cantidad
      };
    } else {
      return {
        success: false,
        error: 'No se pudo obtener la cantidad'
      };
    }
  } catch (error: any) {
    console.error('Error al obtener cantidad:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al obtener cantidad'
    };
  }
}

// Función para obtener las sucursales
export async function obtenerSucursales(): Promise<{ success: boolean; data?: Sucursal[]; error?: string }> {
  try {
    const response = await apiClient.get('/tipos/obtener?tabla=sucursales');
    
    if (response.data) {
      const sucursales = JSON.parse(response.data);
      return {
        success: true,
        data: sucursales
      };
    } else {
      return {
        success: false,
        error: 'No se pudieron obtener las sucursales'
      };
    }
  } catch (error: any) {
    console.error('Error al obtener sucursales:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al obtener sucursales'
    };
  }
}

// Función principal para cargar todas las estadísticas del dashboard
export async function cargarEstadisticasDashboard(sucursalFiltro?: string): Promise<{ success: boolean; data?: DashboardStats; error?: string }> {
  try {
    // Preparar filtros de sucursal
    const filtrosSucursal = sucursalFiltro && sucursalFiltro !== 'TODAS' 
      ? { columnas: ['codsuc'], valores: [sucursalFiltro] }
      : { columnas: [], valores: [] };

    // Cargar estadísticas de fichas catastrales por estado
    const [
      totalFichas,
      fichasPendientes,
      fichasParciales,
      fichasFinalizadas,
      fichasObservadas,
      totalClientes,
    ] = await Promise.all([
      // Fichas por estado
      obtenerCantidadPorFiltros("fichacatastro_eps", filtrosSucursal.columnas, filtrosSucursal.valores),
      obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "P"]),
      obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "P"]),
      obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "F"]),
      obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "O"]),
      obtenerCantidadPorFiltros("clientes", [...filtrosSucursal.columnas], [...filtrosSucursal.valores]),
    ]);

    const stats: DashboardStats = {
      totalFichas: totalFichas.success ? totalFichas.cantidad || 0 : 0,
      fichasPendientes: fichasPendientes.success ? fichasPendientes.cantidad || 0 : 0,
      fichasParciales: fichasParciales.success ? fichasParciales.cantidad || 0 : 0,
      fichasFinalizadas: fichasFinalizadas.success ? fichasFinalizadas.cantidad || 0 : 0,
      fichasObservadas: fichasObservadas.success ? fichasObservadas.cantidad || 0 : 0,
      totalClientes: totalClientes.success ? totalClientes.cantidad || 0 : 0,
    };

    return {
      success: true,
      data: stats
    };

  } catch (error: any) {
    console.error('Error al cargar estadísticas del dashboard:', error);
    toast.error('Error al cargar las estadísticas');
    return {
      success: false,
      error: error.message || 'Error al cargar estadísticas'
    };
  }
}

// Función para obtener estadísticas específicas por categoría
export async function obtenerEstadisticasPorCategoria(categoria: string, sucursalFiltro?: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Preparar filtros de sucursal
    const filtrosSucursal = sucursalFiltro && sucursalFiltro !== 'TODAS' 
      ? { columnas: ['codsuc'], valores: [sucursalFiltro] }
      : { columnas: [], valores: [] };

    let result;
    
    switch (categoria) {
      case 'fichas_por_estado':
        const [pendientes, parciales, finalizadas, observadas] = await Promise.all([
          obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "P"]),
          obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "P"]),
          obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "F"]),
          obtenerCantidadPorFiltros("fichacatastro_eps", [...filtrosSucursal.columnas, "estadoficha"], [...filtrosSucursal.valores, "O"])
        ]);
        
        result = {
          pendientes: pendientes.success ? pendientes.cantidad || 0 : 0,
          parciales: parciales.success ? parciales.cantidad || 0 : 0,
          finalizadas: finalizadas.success ? finalizadas.cantidad || 0 : 0,
          observadas: observadas.success ? observadas.cantidad || 0 : 0
        };
        break;
      default:
        return {
          success: false,
          error: 'Categoría no válida'
        };
    }
    
    return {
      success: true,
      data: result
    };
    
  } catch (error: any) {
    console.error('Error al obtener estadísticas por categoría:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener estadísticas'
    };
  }
} 