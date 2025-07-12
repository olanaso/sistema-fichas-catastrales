import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
// import InspectorActionTable from "./action-table"
import { InspectorDto } from "@/models/inspector"
import { Circle, Shield, ShieldCheck, User, Building, MapPin } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import InspectorActionTable from "./action-table"

export const columns: ColumnDef<InspectorDto>[] = [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <InspectorActionTable inspector={row.original} />
    },
  },
  {
    id: "codigo",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      const inspector = row.original;
      const codigo = `${inspector.codemp}-${inspector.codsede}-${inspector.codinspector}`;
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{codigo}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "nombres",
    accessorKey: "nombres",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Nombres" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          {row.original.nombres || "Sin nombre"}
        </div>
      );
    },
  },
  {
    id: "dni",
    accessorKey: "dni",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="DNI" />
    },
  },
//   {
//     id: "codoficina",
//     accessorKey: "codoficina",
//     header: ({ column }) => {
//       return <TableHeaderColumn column={column} title="Oficina" />
//     },
//     cell: ({ row }) => {
//       return (
//         <div className="text-start flex items-center gap-2">
//           <Building className="w-4 h-4 text-gray-600" />
//           {row.original.codoficina || "Sin oficina"}
//         </div>
//       );
//     },
//   },
//   {
//     id: "codbrigada",
//     accessorKey: "codbrigada",
//     header: ({ column }) => {
//       return <TableHeaderColumn column={column} title="Brigada" />
//     },
//     cell: ({ row }) => {
//       return (
//         <div className="text-start flex items-center gap-2">
//           <MapPin className="w-4 h-4 text-green-600" />
//           {row.original.codbrigada || "Sin brigada"}
//         </div>
//       );
//     },
//   },
  {
    id: "supervisor",
    accessorKey: "supervisor",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Rol" />
    },
    cell: ({ row }) => {
      const supervisor = row.original.supervisor;
      const isSupervisor = supervisor === 1;
      
      return (
        <div className="text-start flex items-center gap-2">
          {isSupervisor ? (
            <ShieldCheck className="w-4 h-4 text-green-600" />
          ) : (
            <Shield className="w-4 h-4 text-blue-600" />
          )}
          <CustomBadge 
            color={isSupervisor ? "green" : "blue"} 
            className="text-xs"
          >
            {isSupervisor ? "Supervisor" : "Inspector"}
          </CustomBadge>
        </div>
      );
    },
  },
//   {
//     id: "estareg",
//     accessorKey: "estareg",
//     header: ({ column }) => {
//       return <TableHeaderColumn column={column} title="Estado" />
//     },
//     cell: ({ row }) => {
//       const estareg = row.original.estareg;
//       const isActive = estareg === 1;
      
//       let icon = <Circle />
//       if (isActive) {
//         icon = <Circle className="text-green-500 bg-green-500/10 p-1 rounded-full" />
//       } else {
//         icon = <Circle className="text-red-500 bg-red-500/10 p-1 rounded-full" />
//       }
//       return <div className="text-start flex items-center gap-2">{icon} {isActive ? "Activo" : "Inactivo"}</div>
//     },
//   },
  {
    id: "asignaciones",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Asignaciones" />
    },
    cell: ({ row }) => {
      const inspector = row.original;
      const asignaciones = [
        inspector.asignadoareclamos,
        inspector.asignadoalectura,
        inspector.asignadoacalibradormed,
        inspector.asignadoacortes,
        inspector.asignadoconsultas,
        inspector.asignadocatastro,
        inspector.asignadoinspecciones,
        inspector.asignadoareapertura,
        inspector.asignadoanotificaciones,
        inspector.asignadoparquemedidores,
        inspector.asignadofactibilidad,
        inspector.asignadoincidenciacampo,
        inspector.asignadoordendepago,
        inspector.asignadoentregarecibo,
        inspector.asignadoalcencegeneral,
        inspector.asignadocatastroreal,
      ].filter(assignment => assignment === 1).length;

      return (
        <div className="text-start">
          <CustomBadge color="orange" className="text-xs">
            {asignaciones} asignaciones
          </CustomBadge>
        </div>
      );
    },
  }
] 