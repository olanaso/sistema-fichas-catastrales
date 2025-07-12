export interface TipoUsuario {
    codemp: string;
    tipousuario: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

export interface TipoUsuarioDto {
    codemp: string;
    tipousuario: string;
    descripcion?: string;
    estareg: number;
    creador: string;
    fechareg?: string;
    orden?: number;
}

// Request para crear/actualizar tipo de usuario
export interface TipoUsuarioRequest {
    codemp: string;
    tipousuario: string;
    descripcion?: string;
    orden?: number;
}

// Response de la API
export interface TipoUsuarioResponse {
    success: boolean;
    message: string;
    data: TipoUsuarioDto;
    timestamp: string;
}

export interface TipoUsuariosResponse {
    success: boolean;
    message: string;
    data: TipoUsuarioDto[];
    timestamp: string;
}

// Funciones de utilidad para tipos de usuario
export const isActive = (tipoUsuario: TipoUsuarioDto | null): boolean => {
    return tipoUsuario?.estareg === 1;
};

export const getTipoUsuarioDescription = (tipoUsuario: TipoUsuarioDto | null): string => {
    if (!tipoUsuario) return "Tipo de Usuario";
    return tipoUsuario.descripcion || tipoUsuario.tipousuario;
};

export const getTipoUsuarioCode = (tipoUsuario: TipoUsuarioDto | null): string => {
    if (!tipoUsuario) return "";
    return `${tipoUsuario.codemp}-${tipoUsuario.tipousuario}`;
};

export const getTipoUsuarioOrder = (tipoUsuario: TipoUsuarioDto | null): number => {
    if (!tipoUsuario) return 0;
    return tipoUsuario.orden || 0;
};

// Función para ordenar tipos de usuario
export const sortTipoUsuarios = (tipoUsuarios: TipoUsuarioDto[]): TipoUsuarioDto[] => {
    return tipoUsuarios.sort((a, b) => {
        const ordenA = a.orden || 999;
        const ordenB = b.orden || 999;
        return ordenA - ordenB;
    });
}; 