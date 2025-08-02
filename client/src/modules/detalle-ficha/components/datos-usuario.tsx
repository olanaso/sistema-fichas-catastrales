"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import AddTarifaDialog from "./form/agregar-tarifa";
import DeleteTarifaDialog from "./form/eliminar-tarifa";
import { FichaCatastro } from "@/models/fichacatastro";
import { ComboboxOption } from "@/types/combobox";
import { useEffect, useState } from "react";
import { buscarExacto, getData } from "@/service/data.actions";
import { getTarifas } from "../action/detalle-ficha.action";
import {
  TipoActividad,
  TipoCategoria,
  TipoResponsable,
  TipoUsuario,
} from "@/models/tipos";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { FichaCatastralUnidadUso } from "@/models/fichacatastral_unidaduso";
import { IconButton } from "@/components/custom/icon-button";
import { Cliente } from "@/models/cliente";
import { TarifaFicha } from "@/models/tarifas";

interface DatosUsuarioProps {
  ficha: FichaCatastro;
  cliente: Cliente | null;
  vistaSupervision: boolean;
  handleActualizarAtributos: (atributo: string, valor: string) => void;
}

export default function DatosUsuario({ ficha, cliente, vistaSupervision, handleActualizarAtributos }: DatosUsuarioProps) {
  // Estado local para manejar los valores actualizados
  const [valoresActualizados, setValoresActualizados] = useState<{ [key: string]: string }>({});

  const [tipoUsuario, setTipoUsuario] = useState<ComboboxOption[]>([]);
  const [tipoResponsable, setTipoResponsable] = useState<ComboboxOption[]>([]);
  const [tipoCategoria, setTipoCategoria] = useState<ComboboxOption[]>([]);
  const [tipoActividad, setTipoActividad] = useState<ComboboxOption[]>([]);
  // const [sectorAbastecimiento, setSectorAbastecimiento] = useState<
  //   ComboboxOption[]
  // >([]);
  const [unidadesUso, setUnidadesUso] = useState<FichaCatastralUnidadUso[]>([]);
  const [tarifas, setTarifas] = useState<TarifaFicha[]>([]);
  
  // Estados para los diálogos
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTarifa, setSelectedTarifa] = useState<TarifaFicha | null>(null);

  useEffect(() => {
    getData("tipousuario").then((res) => {
      setTipoUsuario(
        res.data.map((tipo: TipoUsuario) => ({
          value: tipo.tipousuario,
          label: tipo.descripcion,
        }))
      );
    });
    getData("tiporesponsable").then((res) => {
      setTipoResponsable(
        res.data.map((tipo: TipoResponsable) => ({
          value: tipo.tiporesponsable,
          label: tipo.descripcion,
        }))
      );
    });
    getData("tipocategoria").then((res) => {
      setTipoCategoria(
        res.data.map((tipo: TipoCategoria) => ({
          value: tipo.tipocategoria,
          label: tipo.descripcion,
        }))
      );
    });
    buscarExacto("tipoactividad", ["estareg"], ["1"]).then((res) => {
      setTipoActividad(
        res.data.map((tipo: TipoActividad) => ({
          value: tipo.actividad,
          label: tipo.descripcion + " - " + tipo.codprov,
        }))
      );
    });
    buscarExacto("fichacatastro_epsuniduso", ["idficha", "estareg"], [ficha.idficha.toString(), "1"]).then((res) => {
      setUnidadesUso(res.data);
    });

    // Cargar tarifas
    if (ficha.idficha && ficha.codcliente) {
      getTarifas(ficha.idficha, ficha.codcliente).then((res) => {
        if (res.success && res.data) {
          setTarifas(res.data);
        }
      });
    }
  }, [ficha.idficha, ficha.codcliente]);

  // Función para actualizar la lista de tarifas
  const actualizarTarifas = () => {
    if (ficha.idficha && ficha.codcliente) {
      getTarifas(ficha.idficha, ficha.codcliente).then((res) => {
        if (res.success && res.data) {
          setTarifas(res.data);
        }
      });
    }
  };

  // Función para obtener el valor actual (del estado local o de ficha)
  const obtenerValor = (campo: string, valorOriginal: string | number | null | undefined) => {
    return valoresActualizados[campo] !== undefined 
      ? valoresActualizados[campo] 
      : valorOriginal?.toString() || "No registrado";
  };

  // Función para manejar cambios
  const manejarCambio = (campo: string, valor: string) => {
    setValoresActualizados(prev => ({ ...prev, [campo]: valor }));
    handleActualizarAtributos(campo, valor);
  };

  // Funciones para manejar los diálogos
  const handleAddTarifa = () => {
    setShowAddDialog(true);
  };

  const handleDeleteTarifa = (tarifa: TarifaFicha) => {
    setSelectedTarifa(tarifa);
    setShowDeleteDialog(true);
  };

  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedTarifa(null);
  };

  return (
    <div className="space-y-4">
      {/* Información del usuario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {/* 20. Tipo de Usuario */}
        <div className="space-y-1">
          <Label htmlFor="tipo-usuario" className="text-xs font-medium">
            20. Tipo Usuario
          </Label>
          <ComboboxControlled
            options={tipoUsuario}
            value={obtenerValor("tipousuario", ficha.tipousuario)}
            placeholder="No registrado"
            className={`h-8 text-xs text-white
              ${!vistaSupervision ?
                "text-primary" :
                !(cliente?.tipousuario == ficha.tipousuario) ?
                  "dark:bg-red-500 bg-red-500" :
                  "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("tipousuario", e.toString())}
          />
        </div>

        {/* 21. Usuario/Nombres/Razón Social */}
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="nombres" className="text-xs font-medium">
            21. Usuario/Nombres/Razón Social
          </Label>
          <Input
            id="nombres"
            value={obtenerValor("propietario", ficha.propietario)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("propietario", e.target.value)}
          />
        </div>

        {/* 22. DNI/RUC */}
        <div className="space-y-1">
          <Label htmlFor="dni" className="text-xs font-medium">
            22. DNI/RUC
          </Label>
          <Input
            id="dni"
            value={obtenerValor("dni", ficha.dni)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("dni", e.target.value)}
          />
        </div>

        {/* 23. Nº habitantes */}
        <div className="space-y-1">
          <Label htmlFor="habitantes" className="text-xs font-medium">
            23. Nº Habitantes
          </Label>
          <Input
            id="habitantes"
            value={obtenerValor("habitantes", ficha.habitantes)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("habitantes", e.target.value)}
          />
        </div>

        {/* 24. Responsable */}
        <div className="space-y-1">
          <Label htmlFor="responsable" className="text-xs font-medium">
            24. Responsable
          </Label>
          <ComboboxControlled
            options={tipoResponsable}
            value={obtenerValor("tiporesponsable", ficha.tiporesponsable)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("tiporesponsable", e.toString())}
          />
        </div>

        {/* 25. Teléfono */}
        <div className="space-y-1">
          <Label htmlFor="telefono" className="text-xs font-medium">
            25. Teléfono
          </Label>
          <Input
            id="telefono"
            value={obtenerValor("celular", ficha.celular)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("celular", e.target.value)}
          />
        </div>

        {/* 26. Nº Contrato */}
        <div className="space-y-1">
          <Label htmlFor="contrato" className="text-xs font-medium">
            26. Nº Contrato
          </Label>
          <Input
            id="contrato"
            value={obtenerValor("nrocontrato", ficha.nrocontrato)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("nrocontrato", e.target.value)}
          />
        </div>

        {/* 27. Reservorio Conectado */}
        <div className="space-y-1">
          <Label htmlFor="reservorio" className="text-xs font-medium">
            27. Reservorio Conectado
          </Label>
          <Input
            id="reservorio"
            value={obtenerValor("codreservorio", ficha.codreservorio)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("codreservorio", e.target.value)}
          />
        </div>

        {/* 28. Sector Abastecimiento */}
        <div className="space-y-1">
          <Label htmlFor="sector" className="text-xs font-medium">
            28. Sector Abastecimiento
          </Label>
          <ComboboxControlled
            options={tipoResponsable}
            value={obtenerValor("codsectorabast", ficha.codsectorabast)}
            placeholder="No registrado"
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("codsectorabast", e.toString())}
          />
        </div>

        {/* 29. Categoría */}
        <div className="space-y-1">
          <Label htmlFor="categoria" className="text-xs font-medium">
            29. Categoría
          </Label>
          <ComboboxControlled
            options={tipoCategoria}
            value={obtenerValor("catetar_new", ficha.catetar_new)}
            placeholder="No registrado"
            className={`h-8 text-xs text-white
              ${!vistaSupervision ?
                "text-primary" :
                !(cliente?.catetar == ficha.catetar_new) ?
                "dark:bg-red-500 bg-red-500" :
                "dark:bg-green-500 bg-green-500"}`}
            onChange={(e) => manejarCambio("catetar_new", e.toString())}
          />
        </div>

        {/* 30. Razón Social */}
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="razon-social" className="text-xs font-medium">
            30. Razón Social
          </Label>
          <Input
            id="razon-social"
            value={obtenerValor("razonsocial", ficha.razonsocial)}
            className="h-8 text-xs"
            onChange={(e) => manejarCambio("razonsocial", e.target.value)}
          />
        </div>
      </div>

      {/* Información del sistema */}
      <Card className="bg-red-50 border-red-200 dark:bg-gray-900 dark:border-gray-800">
        <CardContent className="p-3">
          <div className="space-y-1 flex items-center justify-between text-red-700 dark:text-gray-300">
            <p className="text-xs">
              <span className="font-semibold">Categoria Sistema:</span>{" "}
              {ficha.catetar_new || "No registrado"}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Actividad Sistema:</span>{" "}
              {ficha.actividad || "VIVIENDA"}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Unidades de Uso Sistema:</span>{" "}
              {"No atributos"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sección de tarifas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">ASIGNAR TARIFAS</h4>
          <Button size="sm" variant="outline" className="h-8" onClick={handleAddTarifa}>
            <Plus className="w-3 h-3" /> Agregar
          </Button>
        </div>

        <Separator />

        <div className="mt-3 space-y-2">
          {tarifas.length > 0 ? (
            tarifas.map((tarifa: TarifaFicha, index: number) => (
              <div
                key={`tarifa-${index}`}
                className="p-2 border bg-gray-50 rounded-md dark:bg-stone-900 dark:border-stone-800"
              >
                <div className="grid grid-cols-6 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Subcategoría:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 truncate">
                      {tarifa.nombre_tarifa || "No registrado"}
                    </p>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Tipo de actividad:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 truncate">
                      {tipoActividad.find(t => t.value === tarifa.actividad)?.label || "No registrado"}
                    </p>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Razón social:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tarifa.razonsocial || "No registrado"}
                    </p>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Referencia:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                      {tarifa.referencia || "No registrado"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Item:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                      {tarifa.item || "No registrado"}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <IconButton 
                      tooltip="Eliminar" 
                      color="red"
                      onClick={() => handleDeleteTarifa(tarifa)}
                    >
                      <Trash className="w-3 h-3" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm">No hay tarifas registradas</p>
            </div>
          )}
                 </div>
       </div>

       {/* Diálogos */}
       <AddTarifaDialog
         isOpen={showAddDialog}
         onClose={handleCloseAddDialog}
         actividades={tipoActividad}
         codemp={ficha.codemp || ""}
         codsuc={ficha.codsuc || ""}
         creador={ficha.creador || ""}
         codcliente={ficha.codcliente}
         idficha={ficha.idficha}
         onTarifaAdded={actualizarTarifas}
       />

       {selectedTarifa && (
         <DeleteTarifaDialog
           isOpen={showDeleteDialog}
           onClose={handleCloseDeleteDialog}
           tarifaId={selectedTarifa.item || 0}
           tarifaNombre={selectedTarifa.nombre_tarifa || "Tarifa sin nombre"}
           idficha={ficha.idficha}
           onTarifaDeleted={actualizarTarifas}
         />
       )}
     </div>
   );
 }
