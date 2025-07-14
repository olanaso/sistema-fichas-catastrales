// src/service/obtener-data-dinamico.ts
import apiClient from "@/lib/axios";

export async function obtenerDataDinamico<T = any>(tabla: string): Promise<T[]> {
  try {
    const response = await apiClient.get(`/tipos/obtener?tabla=${tabla}`);
    return response.data || [];
  } catch (error) {
    console.error("Error al obtener datos dinámicos:", error);
    return [];
  }
}

export async function buscarPorColumna<T = any>(
    tabla: string,
    columna: string,
    valor: string
  ): Promise<T[]> {
    try {
      const response = await apiClient.get(
        `/tipos/buscar?tabla=${encodeURIComponent(tabla)}&columna=${encodeURIComponent(columna)}&valor=${encodeURIComponent(valor)}`
      );
      return response.data || [];
    } catch (error) {
      console.error("Error al buscar por columna:", error);
      return [];
    }
  }
