import { addDays, startOfDay, endOfDay, format } from "date-fns";
import apiClient from "@/lib/axios";
import { ReunionDto, ServicioInstitucionDto, DashboardStats } from "@/types/dashboard.types";

// Obtener las próximas reuniones (próximos 7 días)
export const getProximasReuniones = async (): Promise<ReunionDto[]> => {
    try {
        const hoy = startOfDay(new Date());
        const sieteDiasDespues = endOfDay(addDays(hoy, 7));

        const response = await apiClient.get('/dashboard/proximas-reuniones', {
            params: {
                fechaInicio: format(hoy, "yyyy-MM-dd"),
                fechaFin: format(sieteDiasDespues, "yyyy-MM-dd")
            }
        });

        return response.data.data || [];
    } catch (error) {
        console.error("Error fetching próximas reuniones:", error);
        return [];
    }
};

// Obtener servicios que vencen en los próximos 30 días
export const getServiciosPorVencer = async (): Promise<ServicioInstitucionDto[]> => {
    try {
        const hoy = startOfDay(new Date());
        const treintaDiasDespues = endOfDay(addDays(hoy, 30));

        const response = await apiClient.get('/dashboard/servicios-por-vencer', {
            params: {
                fechaInicio: format(hoy, "yyyy-MM-dd"),
                fechaFin: format(treintaDiasDespues, "yyyy-MM-dd")
            }
        });

        return response.data.data || [];
    } catch (error) {
        console.error("Error fetching servicios por vencer:", error);
        return [];
    }
};

// Obtener estadísticas del dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        const response = await apiClient.get('/dashboard/stats');
        return response.data.data || {
            totalReuniones: 0,
            reunionesPendientes: 0,
            serviciosActivos: 0,
            serviciosPorVencer: 0
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
            totalReuniones: 0,
            reunionesPendientes: 0,
            serviciosActivos: 0,
            serviciosPorVencer: 0
        };
    }
}; 