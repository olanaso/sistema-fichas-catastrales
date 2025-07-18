-- AGREGAR LA COLUMNA DE ACTIVO EN LA TABLA DE USUARIOS
ALTER TABLE fichacatastral.usersystema ADD activo boolean DEFAULT true NOT NULL;

--  GRUPO DE TRABAJO
CREATE TABLE fichacatastral.usp_grupotrabajo (
    codgrupo VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true NOT NULL,
    codlider VARCHAR(20) NOT NULL,
    fechareg DATE default NOW()
);

-- GUARDAR HISTORIAL DE IMPORTACION DE PADRON
CREATE TABLE fichacatastral.usp_padronhistorico (
    codpadron VARCHAR(20) PRIMARY KEY,
    creador VARCHAR(100) NOT NULL,
    fecha_importacion TIMESTAMP NOT NULL DEFAULT NOW(),
    cantidad_registros INTEGER NOT NULL DEFAULT 0,
    estado VARCHAR(20) NOT NULL
);