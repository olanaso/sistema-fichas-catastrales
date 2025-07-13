// Exportar la vista principal
export { default as GrupoTrabajoView } from './view/grupotrabajo.view';

// Exportar el contexto
export { GrupoTrabajoProvider, useGrupoTrabajo } from './context/grupotrabajo-context';

// Exportar las acciones
export * from './action/grupotrabajo.actions';

// Exportar los esquemas
export * from './schema/grupotrabajo.schema';

// Exportar los componentes
export { default as CreateGrupoTrabajoForm } from './components/forms/create-grupotrabajo';
export { default as UpdateGrupoTrabajoForm } from './components/forms/update-grupotrabajo';
export { default as ActionTable } from './components/table/action-table';
export { default as TableGrupoTrabajo } from './components/table/table-grupotrabajo';
export { createColumns } from './components/table/columns'; 