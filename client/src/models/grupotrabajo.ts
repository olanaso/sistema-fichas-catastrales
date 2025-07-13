export interface GrupoTrabajo {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: string[];
}

export interface GrupoTrabajoDto {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: string[];
}

// Request para crear/actualizar grupo de trabajo
export interface GrupoTrabajoRequest {
    codgrupo: string;
    nombre: string;
    activo: boolean;
    codlider: string;
    inspectores: string[];
}

// Response de la API
export interface GrupoTrabajoResponse {
    success: boolean;
    message: string;
    data: GrupoTrabajoDto;
    timestamp: string;
}

export interface GruposTrabajoResponse {
    success: boolean;
    message: string;
    data: GrupoTrabajoDto[];
    timestamp: string;
}

// Funciones de utilidad para grupos de trabajo
export const isActive = (grupo: GrupoTrabajoDto | null): boolean => {
    return grupo?.activo ?? false;
};

export const getGroupCode = (grupo: GrupoTrabajoDto | null): string => {
    if (!grupo) return "";
    return grupo.codgrupo || "";
};

export const getGroupName = (grupo: GrupoTrabajoDto | null): string => {
    if (!grupo) return "";
    return grupo.nombre || "";
};

export const getLeaderCode = (grupo: GrupoTrabajoDto | null): string => {
    if (!grupo) return "";
    return grupo.codlider || "";
};

export const getInspectors = (grupo: GrupoTrabajoDto | null): string[] => {
    if (!grupo) return [];
    return grupo.inspectores || [];
};

export const getInspectorsCount = (grupo: GrupoTrabajoDto | null): number => {
    if (!grupo) return 0;
    return grupo.inspectores?.length || 0;
};

export const hasInspector = (grupo: GrupoTrabajoDto | null, inspectorCode: string): boolean => {
    if (!grupo) return false;
    return grupo.inspectores?.includes(inspectorCode) || false;
};

export const addInspector = (grupo: GrupoTrabajoDto | null, inspectorCode: string): string[] => {
    if (!grupo) return [];
    const currentInspectors = grupo.inspectores || [];
    if (!currentInspectors.includes(inspectorCode)) {
        return [...currentInspectors, inspectorCode];
    }
    return currentInspectors;
};

export const removeInspector = (grupo: GrupoTrabajoDto | null, inspectorCode: string): string[] => {
    if (!grupo) return [];
    const currentInspectors = grupo.inspectores || [];
    return currentInspectors.filter(code => code !== inspectorCode);
};

export const isGroupFull = (grupo: GrupoTrabajoDto | null, maxInspectors: number = 10): boolean => {
    if (!grupo) return false;
    return getInspectorsCount(grupo) >= maxInspectors;
};

export const canAddInspector = (grupo: GrupoTrabajoDto | null, inspectorCode: string, maxInspectors: number = 10): boolean => {
    if (!grupo) return false;
    if (hasInspector(grupo, inspectorCode)) return false;
    if (isGroupFull(grupo, maxInspectors)) return false;
    return true;
};

export const getGroupStatus = (grupo: GrupoTrabajoDto | null): 'active' | 'inactive' => {
    return isActive(grupo) ? 'active' : 'inactive';
};

export const getGroupStatusText = (grupo: GrupoTrabajoDto | null): string => {
    return isActive(grupo) ? 'Activo' : 'Inactivo';
};

export const getGroupStatusColor = (grupo: GrupoTrabajoDto | null): string => {
    return isActive(grupo) ? 'green' : 'red';
};

export const validateGroupCode = (code: string): boolean => {
    return code.length > 0 && code.length <= 20;
};

export const validateGroupName = (name: string): boolean => {
    return name.length > 0 && name.length <= 100;
};

export const validateLeaderCode = (code: string): boolean => {
    return code.length > 0 && code.length <= 10;
};

export const validateInspectors = (inspectors: string[]): boolean => {
    return inspectors.every(code => code.length > 0 && code.length <= 10);
};

export const createEmptyGroup = (): GrupoTrabajoDto => {
    return {
        codgrupo: "",
        nombre: "",
        activo: true,
        codlider: "",
        inspectores: []
    };
};

export const cloneGroup = (grupo: GrupoTrabajoDto): GrupoTrabajoDto => {
    return {
        ...grupo,
        inspectores: [...grupo.inspectores]
    };
};

export const compareGroups = (group1: GrupoTrabajoDto, group2: GrupoTrabajoDto): boolean => {
    return (
        group1.codgrupo === group2.codgrupo &&
        group1.nombre === group2.nombre &&
        group1.activo === group2.activo &&
        group1.codlider === group2.codlider &&
        JSON.stringify(group1.inspectores.sort()) === JSON.stringify(group2.inspectores.sort())
    );
};

export const getGroupSummary = (grupo: GrupoTrabajoDto | null): string => {
    if (!grupo) return "Sin información";
    return `${grupo.nombre} (${grupo.codgrupo}) - ${getInspectorsCount(grupo)} inspectores`;
};

export const formatInspectorsList = (grupo: GrupoTrabajoDto | null): string => {
    if (!grupo) return "Sin inspectores";
    const inspectors = getInspectors(grupo);
    if (inspectors.length === 0) return "Sin inspectores";
    if (inspectors.length === 1) return inspectors[0];
    if (inspectors.length <= 3) return inspectors.join(", ");
    return `${inspectors.slice(0, 3).join(", ")} y ${inspectors.length - 3} más`;
};
