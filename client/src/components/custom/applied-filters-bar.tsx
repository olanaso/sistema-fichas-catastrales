import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AppliedFiltersBarProps {
  filtros: Record<string, any>;
  onLimpiar: () => void;
  onMostrarFormulario: () => void;
  grupos?: Array<{ value: string | number; label: string }>;
  inspectores?: Array<{ value: string | number; label: string }>;
  estados?: Array<{ value: string | number; label: string }>;
}

export function AppliedFiltersBar({
  filtros,
  onLimpiar,
  onMostrarFormulario,
  grupos = [],
  inspectores = [],
  estados = []
}: AppliedFiltersBarProps) {
  const getLabelByValue = (value: string, options: Array<{ value: string | number; label: string }>) => {
    const option = options.find(opt => opt.value.toString() === value);
    return option ? option.label : value;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: es });
    } catch {
      return dateString;
    }
  };

  const renderFilterBadge = (key: string, value: string) => {
    let label = "";
    let displayValue = value;

    switch (key) {
      case "grupo":
        label = "Grupo";
        displayValue = getLabelByValue(value, grupos);
        break;
      case "inspector":
        label = "Inspector";
        displayValue = getLabelByValue(value, inspectores);
        break;
      case "estado":
        label = "Estado";
        displayValue = getLabelByValue(value, estados);
        break;
      case "fechaInicio":
        label = "Fecha Inicio";
        displayValue = formatDate(value);
        break;
      case "fechaFin":
        label = "Fecha Fin";
        displayValue = formatDate(value);
        break;
      default:
        label = key;
    }

    return (
      <Badge key={key} variant="secondary" className="flex items-center gap-1">
        <span className="text-xs font-medium">{label}:</span>
        <span className="text-xs">{displayValue}</span>
      </Badge>
    );
  };

  const filtrosAplicados = Object.entries(filtros).filter(
    ([_, value]) => value && value.toString().trim() !== ""
  );

  if (filtrosAplicados.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Filtros aplicados:
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMostrarFormulario}
            className="text-xs h-7"
          >
            Modificar filtros
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLimpiar}
            className="text-xs h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-3 w-3 mr-1" />
            Limpiar
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {filtrosAplicados.map(([key, value]) => 
          renderFilterBadge(key, value)
        )}
      </div>
    </div>
  );
} 