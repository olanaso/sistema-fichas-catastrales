"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  Users, 
  UserCheck, 
  Building2, 
  Droplets, 
  Gauge, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  TrendingUp,
  MapPin,
  Database,
  Activity,
  Building
} from "lucide-react";
import { cargarEstadisticasDashboard, obtenerSucursales } from "../action/dashboard.action";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Sucursal } from "@/models/modulos";
import { ComboboxOption } from "@/types/combobox";
import { getData } from "@/service/data.actions";

interface DashboardStats {
  // Fichas Catastrales
  totalClientes: number;
  totalFichas: number;
  fichasPendientes: number;
  fichasParciales: number;
  fichasFinalizadas: number;
  fichasObservadas: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sucursales, setSucursales] = useState<ComboboxOption[]>([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<string>("TODAS");

  const handleSucursalChange = (value: string | number) => {
    setSucursalSeleccionada(String(value));
  };

  useEffect(() => {
    const cargarSucursales = async () => {
      try {
        const resultado = await getData("sucursales");
        if (resultado.success && resultado.data) {
          setSucursales(resultado.data.map((sucursal: Sucursal) => ({
            value: sucursal.codsuc,
            label: sucursal.nombre
          })));
        }
      } catch (error) {
        console.error('Error loading sucursales:', error);
      }
    };

    cargarSucursales();
  }, []);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setLoading(true);
        
        const resultado = await cargarEstadisticasDashboard(sucursalSeleccionada);
        
        if (resultado.success && resultado.data) {
          setStats(resultado.data);
        } else {
          setError(resultado.error || 'Error al cargar las estadísticas');
        }

      } catch (error) {
        setError('Error al cargar las estadísticas');
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, [sucursalSeleccionada]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error || 'Error al cargar estadísticas'}</p>
      </div>
    );
  }

  const tasaCompletitud = stats.totalFichas > 0 ? ((stats.fichasFinalizadas / stats.totalFichas) * 100).toFixed(1) : '0';
  const tasaObservacion = stats.totalFichas > 0 ? ((stats.fichasObservadas / stats.totalFichas) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-4">
      {/* Header compacto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Dashboard del Sistema</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Estadísticas en tiempo real del sistema de fichas catastrales
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <ComboboxControlled
            options={sucursales}
            value={sucursalSeleccionada}
            onChange={handleSucursalChange}
            placeholder="Todas las sucursales"
            className="w-48"
          />
        </div>
      </div>

      {/* KPIs Principales - Grid más compacto */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Total Fichas */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Total Padron
              </CardTitle>
              <FileText className="h-3 w-3 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-orange-900 dark:text-orange-100">
              {stats.totalClientes.toLocaleString()}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Importados
            </p>
          </CardContent>
        </Card>
        
        {/* Total Fichas */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Total Fichas
              </CardTitle>
              <FileText className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-100">
              {stats.totalFichas.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Registrados
            </p>
          </CardContent>
        </Card>

        {/* Fichas Finalizadas */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-green-700 dark:text-green-300">
                Finalizadas
              </CardTitle>
              <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-green-900 dark:text-green-100">
              {stats.fichasFinalizadas.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {tasaCompletitud}% del total
            </p>
          </CardContent>
        </Card>

        {/* Fichas Pendientes */}
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                Pendientes
              </CardTitle>
              <Clock className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-yellow-900 dark:text-yellow-100">
              {stats.fichasPendientes.toLocaleString()}
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        {/* Fichas Parciales */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-purple-700 dark:text-purple-300">
                Parciales
              </CardTitle>
              <Clock className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-purple-900 dark:text-purple-100">
              {stats.fichasParciales.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              Requieren revisión
            </p>
          </CardContent>
        </Card>

        {/* Fichas Observadas */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium text-red-700 dark:text-red-300">
                Observadas
              </CardTitle>
              <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl font-bold text-red-900 dark:text-red-100">
              {stats.fichasObservadas.toLocaleString()}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400">
              {tasaObservacion}% del total
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
} 