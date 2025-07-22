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

ALTER TABLE fichacatastral.clientes
ADD CONSTRAINT unique_codcliente UNIQUE (codcliente);

ALTER TABLE fichacatastral.inspectores
ADD CONSTRAINT unique_codinspectores UNIQUE (codinspector);

CREATE TABLE fichacatastral.usp_asignaciones ( 
    id SERIAL PRIMARY KEY,
    programacion_id INTEGER NOT NULL,
    codcliente INTEGER NOT NULL,
    codinspector VARCHAR(20) NOT NULL,
    fecha_asignacion DATE NOT NULL DEFAULT CURRENT_DATE,
    observaciones TEXT,
    CONSTRAINT fk_asignaciones_programacion
        FOREIGN KEY (programacion_id)
        REFERENCES fichacatastral.usp_programaciones(id) on delete cascade,
    CONSTRAINT fk_asignaciones_cliente
        FOREIGN KEY (codcliente)
        REFERENCES fichacatastral.clientes(codcliente) on delete cascade,
    CONSTRAINT fk_asignaciones_integrante
        FOREIGN KEY (codinspector)
        REFERENCES fichacatastral.inspectores(codinspector) on delete cascade
);

CREATE TABLE fichacatastral.usp_programaciones (
    id SERIAL PRIMARY KEY,
    fechareg DATE NOT NULL,
    creador VARCHAR(100) not null,
    codgrupo VARCHAR(20) NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('En proceso', 'Finalizado')),
    observaciones TEXT,

    CONSTRAINT fk_programaciones_grupo
        FOREIGN KEY (codgrupo)
        REFERENCES fichacatastral.usp_grupotrabajo(codgrupo) on delete cascade
);

