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


-- MIGRAR LA TABLA CALLES - SOLO NUEVOS REGISTROS
INSERT INTO fichacatastral.calles (
  codemp,
  codsuc,
  codcalle,
  tipocalle,
  descripcioncalle,
  creador
)
SELECT
  LPAD(CAST(CAST(REGCOD AS INTEGER) AS TEXT), 3, '0') AS codemp,
  LPAD(CAST(CAST(ZONCOD AS INTEGER) AS TEXT), 3, '0') AS codsuc,
  CAST(CALCOD AS INTEGER) AS codcalle,
  LEFT(TRIM(CALTIP), 3),
  LEFT(TRIM(CALDES), 70),
  'migracion'
FROM migra.rzcalle m
WHERE NOT EXISTS (
  SELECT 1
  FROM fichacatastral.calles f
  WHERE 
    f.codemp = LPAD(CAST(CAST(m.REGCOD AS INTEGER) AS TEXT), 3, '0')
    AND f.codsuc = LPAD(CAST(CAST(m.ZONCOD AS INTEGER) AS TEXT), 3, '0')
    AND f.codcalle = CAST(m.CALCOD AS INTEGER)
);

-- MIGRAR LA TABLA URBANIZACIONES - SOLO NUEVOS REGISTROS
INSERT INTO fichacatastral.urbanmae (
    codemp, codsuc, codurbaso, descripcionurba, tipourba, creador
)
SELECT
    LPAD(CAST(CAST("REGCOD" AS INT) AS TEXT), 3, '0') AS codemp,
    LPAD(CAST(CAST("LOCCOD" AS INT) AS TEXT), 3, '0') AS codsuc,
    LPAD(CAST(CAST("URBCOD" AS INT) AS TEXT), 3, '0') AS codurbaso,
    "URBDES" AS descripcionurba,
    LEFT("URBTIP", 3) AS tipourba,
    'migrador' AS creador
FROM migra.rlurba m
WHERE NOT EXISTS (
    SELECT 1
    FROM fichacatastral.urbanmae u
    WHERE u.codemp = LPAD(CAST(CAST(m."REGCOD" AS INT) AS TEXT), 3, '0')
      AND u.codsuc = LPAD(CAST(CAST(m."LOCCOD" AS INT) AS TEXT), 3, '0')
      AND u.codurbaso = LPAD(CAST(CAST(m."URBCOD" AS INT) AS TEXT), 3, '0')
);




-- MIGRACIÓN DE TIPO CONSTRUCCIÓN--
CREATE OR REPLACE FUNCTION fichacatastral.migrar_tipoconstruccion(p_codemp varchar, p_creador varchar)
RETURNS void AS
$$
DECLARE
    rec RECORD;
    ultimo_codigo int;
    nuevo_codigo varchar(3);
BEGIN
    -- Obtener el último código tipoconstru actual (como número)
    SELECT COALESCE(MAX(tipoconstru::int), 0) INTO ultimo_codigo
    FROM fichacatastral.tipoconstruccion
    WHERE codemp = p_codemp;

    -- Recorrer los registros válidos desde migra.tabtipconstru
    FOR rec IN
        SELECT DISTINCT
            LPAD(CAST("TIPCONSTRU"::int AS varchar), 3, '0') AS codequiv,
            TRIM("DESTIPCONSTRU") AS descripcion
        FROM migra.tabtipconstru
        WHERE "TIPCONSTRU" IS NOT NULL
          AND "TIPCONSTRU" <> 0
          AND "DESTIPCONSTRU" IS NOT NULL
    LOOP
        -- Verificar si ya existe el codequivalencia o descripcion
        IF NOT EXISTS (
            SELECT 1 FROM fichacatastral.tipoconstruccion
            WHERE codemp = p_codemp
              AND (codequivalencia = rec.codequiv OR descripcion = rec.descripcion)
        ) THEN
            -- Generar nuevo código correlativo
            ultimo_codigo := ultimo_codigo + 1;
            nuevo_codigo := LPAD(ultimo_codigo::text, 3, '0');

            -- Insertar nuevo registro
            INSERT INTO fichacatastral.tipoconstruccion (
                codemp, tipoconstru, descripcion, estareg,
                creador, fechareg, orden, codequivalencia
            ) VALUES (
                p_codemp, nuevo_codigo, rec.descripcion, 1,
                p_creador, now(), null, rec.codequiv
            );
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;


-- MIGRACIÓN DE TIPO ALMACENAJE--
CREATE OR REPLACE FUNCTION fichacatastral.migrar_tipoalmacenaje(p_codemp varchar, p_creador varchar)
RETURNS void AS
$$
DECLARE
    rec RECORD;
    ultimo_codigo int;
    nuevo_codigo varchar(3);
BEGIN
    -- Obtener el último código tipoalma actual (como número)
    SELECT COALESCE(MAX(tipoalma::int), 0) INTO ultimo_codigo
    FROM fichacatastral.tipoalmacenaje
    WHERE codemp = p_codemp;

    -- Recorrer los registros válidos desde migra.tabalmacen
    FOR rec IN
        SELECT DISTINCT
            LPAD(CAST("CODALMACEN"::int AS varchar), 3, '0') AS codequiv,
            TRIM("DESALMACEN") AS descripcion
        FROM migra.tabalmacen
        WHERE "CODALMACEN" IS NOT NULL
          AND "CODALMACEN" <> 0
          AND "DESALMACEN" IS NOT NULL
    LOOP
        -- Verificar si ya existe el codequivalencia o descripcion
        IF NOT EXISTS (
            SELECT 1 FROM fichacatastral.tipoalmacenaje
            WHERE codemp = p_codemp
              AND (codequivalencia = rec.codequiv OR descripcion = rec.descripcion)
        ) THEN
            -- Generar nuevo código correlativo
            ultimo_codigo := ultimo_codigo + 1;
            nuevo_codigo := LPAD(ultimo_codigo::text, 3, '0');

            -- Insertar nuevo registro
            INSERT INTO fichacatastral.tipoalmacenaje (
                codemp, tipoalma, descripcion, estareg,
                creador, fechareg, orden, codequivalencia
            ) VALUES (
                p_codemp, nuevo_codigo, rec.descripcion, 1,
                p_creador, now(), null, rec.codequiv
            );
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- MIGRACIÓN DE TIPO ABATECIMIENTO--
CREATE OR REPLACE FUNCTION fichacatastral.migrar_tipoabastecimiento(p_codemp varchar, p_creador varchar)
RETURNS void AS
$$
DECLARE
    rec RECORD;
    ultimo_codigo int;
    nuevo_codigo varchar(3);
BEGIN
    -- Obtener el último código tipoaba actual (como número)
    SELECT COALESCE(MAX(tipoaba::int), 0) INTO ultimo_codigo
    FROM fichacatastral.tipoabastecimiento
    WHERE codemp = p_codemp;

    -- Recorrer los registros válidos desde migra.tabsag
    FOR rec IN
        SELECT DISTINCT
            LPAD(CAST("CODABASAG"::int AS varchar), 3, '0') AS codequiv,
            TRIM("DESABASAG") AS descripcion
        FROM migra.tabsag
        WHERE "CODABASAG" IS NOT NULL
          AND "CODABASAG" <> 0
          AND "DESABASAG" IS NOT NULL
    LOOP
        -- Verificar si ya existe el codequivalencia o descripcion
        IF NOT EXISTS (
            SELECT 1 FROM fichacatastral.tipoabastecimiento
            WHERE codemp = p_codemp
              AND (codequivalencia = rec.codequiv OR descripcion = rec.descripcion)
        ) THEN
            -- Generar nuevo código correlativo
            ultimo_codigo := ultimo_codigo + 1;
            nuevo_codigo := LPAD(ultimo_codigo::text, 3, '0');

            -- Insertar nuevo registro
            INSERT INTO fichacatastral.tipoabastecimiento (
                codemp, tipoaba, descripcion, estareg,
                creador, fechareg, orden, codequivalencia
            ) VALUES (
                p_codemp, nuevo_codigo, rec.descripcion, 1,
                p_creador, now(), null, rec.codequiv
            );
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- MIGRACIÓN DE TIPO RESPONSABLE--  
CREATE OR REPLACE FUNCTION fichacatastral.migrar_tiporesponsable(p_codemp varchar, p_creador varchar)
RETURNS void AS
$$
DECLARE
    rec RECORD;
    ultimo_codigo int;
    nuevo_codigo varchar(3);
BEGIN
    -- Obtener el último código tiporesponsable actual (como número)
    SELECT COALESCE(MAX(tiporesponsable::int), 0) INTO ultimo_codigo
    FROM fichacatastral.tiporesponsable
    WHERE codemp = p_codemp;

    -- Recorrer los registros válidos desde migra.tipten
    FOR rec IN
        SELECT DISTINCT
            LPAD(CAST("CODTIPTEN"::int AS varchar), 3, '0') AS codequiv,
            TRIM("DESTIPTEN") AS descripcion
        FROM migra.tipten
        WHERE "CODTIPTEN" IS NOT NULL
          AND "CODTIPTEN" <> 0
          AND "DESTIPTEN" IS NOT NULL
    LOOP
        -- Verificar si ya existe el codequivalencia o descripcion
        IF NOT EXISTS (
            SELECT 1 FROM fichacatastral.tiporesponsable
            WHERE codemp = p_codemp
              AND (codequivalencia = rec.codequiv OR descripcion = rec.descripcion)
        ) THEN
            -- Generar nuevo código correlativo
            ultimo_codigo := ultimo_codigo + 1;
            nuevo_codigo := LPAD(ultimo_codigo::text, 3, '0');

            -- Insertar nuevo registro
            INSERT INTO fichacatastral.tiporesponsable (
                codemp, tiporesponsable, descripcion, estareg,
                creador, fechareg, orden, codequivalencia
            ) VALUES (
                p_codemp, nuevo_codigo, rec.descripcion, 1,
                p_creador, now(), null, rec.codequiv
            );
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION fichacatastral.migrar_clientes_desde_vista()
RETURNS void AS
$$
BEGIN
    -- Limpia datos previos si deseas
    -- TRUNCATE TABLE fichacatastral.clientes_1;

    INSERT INTO fichacatastral.clientes_1 (
        codemp,
        codsuc,
        codsector,
        codmza,
        nrolote,
        nrosublote,
        codcliente,
        codcatastral,
        codcalle,
        caltip,
        nrocalle,
        codurbaso,
        urbtip,
        altocon,
        piso,
        tiposervicio,
        estadoservicio_a,
        piscina,
        tiporeser,
        estadoservicio,
        propietario,
        ruc,
        telefono,
        estadoservicio_d,
        diametro_a,
        tipomterial,
        materialc,
        loccaja_a,
        nro_medidor,
        fecha_inst,
        diametro_d,
        estadoservicio_d,
        diametro_m,
        tipomterial_d,
        caja_d,
        codcentropobla,
        cant_uso,
        nrocontrato,
        reprutrep,
        codrutalectura,
        contipmul,
        contipult,
        prelocali
    )
    SELECT
        PREREGION,
        PREZONA,
        SECTOR,
        MANZANA,
        LOTE,
        SUBLOTE,
        codcliente,
        SUMINISTRO,
        PRECALLE,
        CALTIP,
        NRO_MUNI,
        PREURBA,
        URBTIP,
        TIPOCONSTR,
        PISO,
        CODTIPSER,
        CODABASAG,
        COD_PISCIN,
        CODTIPRES,
        CODESCLTE,
        CLIENTE,
        RUC,
        TELEFONO,
        CONESTADO,
        CONDIACOD_,
        CONMATERI,
        CONCAJMAT,
        LOCCAJA_A,
        MEDIDOR,
        FECHA_INST,
        CONDIACOD2,
        CONDESTAD,
        CONDICOD,
        CONMATDES,
        CONCAJMDE,
        COD_UBICA,
        CANT_USO,
        CONTRA,
        REPRUTREP,
        CONRUTLEC,
        CONTIPMUL,
        CONTIPULT,
        PRELOCALI
    FROM fichacatastral.usp_datamigra;

    RAISE NOTICE 'Migración completada exitosamente.';
END;
$$ LANGUAGE plpgsql;


-- SCRIPT PARA MICGRAR A CLIENTES ----
INSERT INTO fichacatastral.clientes_1 (
    codemp, codsuc, codsector, codmza, nrolote, nrosublote, codcliente, codiusua,
    codcalle, caltip, nrocalle, codurbaso, urbtip, constru, piso, tiposervicio,
    piscina, tiporeser, tipousuario, propietario, ruc, telefono, estadoservicio_a,
    diametro_a, tipomterial, materialc, loccaja_a, nro_medidor, fecha_inst,
    diametro_m, estadoservicio_d, diametro_d, tipomterial_d, caja_d,
    cant_uso, nrocontrato_sici, reprutrep, contipmul, contipult, prelocali,
    codcatastral, estadoregistro, sinmora, variasunidadesuso, altocon, precorte, sinmoraotrosser,
    sinigvotrosser, impedimentocorte, conexionhastacaja, conexiontemporal, desaguexderivacion, fuentepropia, judicializado,
    infocorp)
SELECT 
    v.preregion AS codemp,                      -- PREREGION (varchar)
    v.prezona AS codsuc,                       -- PREZONA (varchar)
    v.sector AS codsector,                     -- SECTOR (varchar)
    v.manzana AS codmza,                       -- MANZANA (varchar)
    v.lote AS nrolote,                         -- LOTE (varchar)
    v.sublote AS nrosublote,                   -- SUBLOTE (varchar)
    v.codcliente AS codcliente,                -- codcliente (integer)
    v.suministro AS codiusua,                  -- SUMINISTRO (varchar)

    CAST(COALESCE(v.precalle, '000') AS INTEGER) AS codcalle,  -- PRECALLE (convertido a integer)
    v."CALTIP" AS caltip,                        -- CALTIP (varchar)
    v.nro_muni AS nrocalle,                    -- NRO_MUNI (varchar)

    v.preurba AS codurbaso,                    -- PREURBA (varchar)
    v."URBTIP" AS urbtip,                        -- URBTIP (varchar)
    v.tipoconstruccion AS constru,             -- TIPOCONSTR (varchar)
    v.piso AS piso,  -- PISO (convertido a integer)

    v.codtipser AS tiposervicio,               -- CODTIPSER (varchar)
    v.cod_piscina AS piscina,                  -- COD_PISCIN (varchar)
    v.codtipres AS tiporeser,                  -- CODTIPRES (varchar)
    v.codesclte AS tipousuario,                -- CODESCLTE (varchar)
    v.cliente AS propietario,                  -- CLIENTE (varchar)
    v.ruc AS ruc,                              -- RUC (varchar)
    v.telefono AS telefono,                    -- TELEFONO (varchar)

    v.codestado AS estadoservicio_a,           -- CONESTADO (varchar)
    v.condiacod AS diametro_a,                 -- CONDIACOD_ (varchar)
    v.conmateri AS tipomterial,                -- CONMATERI (varchar)
    v.concajmat AS materialc,                  -- CONCAMAT (varchar)
    v.loccaja_a AS loccaja_a,                  -- LOCCAJA_A (varchar)
    v.medidor AS nro_medidor,                  -- MEDIDOR (varchar)
    v.fecha_instalacion AS fecha_inst,         -- FECHA_INST (timestamp)

    v.diametro_medidor_cod AS diametro_m,      -- CONDIACOD2 (varchar)
    v.condestad AS estadoservicio_d,           -- CONESTAD (varchar)
    v.condidcod AS diametro_d,                 -- CONDICOD (varchar)
    v.conmatdes AS tipomterial_d,              -- CONMATDES (varchar)
    v.concajmde AS caja_d,                     -- CONCAMJDE (varchar)

    v.cant_uso AS cant_uso,                    -- CANT_USO (integer)
    v."CONTRA"::VARCHAR AS nrocontrato_sici,     -- CONTRA (convertido a varchar)
    v."REPRUTREP" AS reprutrep,                  -- REPRUTREP (integer)
    v."CONTIPMUL" AS contipmul,                  -- CONTIPMUL (integer)
    v."CONTIPULT" AS contipult,                  -- CONTIPULT (integer)
    v."PRELOCALI" AS prelocali,                  -- PRELOCALI (integer)

    -- Campos adicionales generados
    '' AS codcatastral,
    1 as estadoregistro,
    1 as sinmora,
    0 as variasunidadesuso,
    0 as altocon,
    0 as precorte,
    0 as sinmoraotrosser,
    0 as sinigvotrosser,
    0 as impedimentocorte,
    0 as conexionhastacaja,
    0 as conexiontemporal,
    0 as desaguexderivacion,
    0 as fuentepropia,
    0 as judicializado,
    0 as infocorp
FROM fichacatastral.vista_padron_sici v;

-- QUERY DE MIGRACIÓNN UNIDADES DE USO ANT---
INSERT INTO fichacatastral.uniduso_ant (
    id,
    preregion,
    nro_uniduso,
    prezona,
    codcattar,
    codscatta,
    tarifa,
    codtipten,
    cant_persona,
    cliusocod,
    cant_u_uso,
    codcliente
)
SELECT
    ROW_NUMBER() OVER () AS id,
    preregion,
    nro_uniduso,
    prezona,
    codcattar,
    codscatta,
    tarifa,
    codtipten,
    cant_persona,
    cliusocod,
    cant_u_uso,
    codcliente
FROM fichacatastral.vista_uduso_sici;


-- MODIFICACIONES NECESARIAS PARA MIGRAR EN TABLA CLIENTES
-- ALTER TABLE TELEFONO VARCHAR(15) A VARCHAR(25)
ALTER TABLE fichacatastral.clientes ALTER COLUMN telefono TYPE VARCHAR(25);
ALTER TABLE fichacatastral.clientes ALTER COLUMN propietario TYPE VARCHAR(200);

ALTER TABLE fichacatastral.usp_padronhistorico ALTER COLUMN codpadron TYPE SERIAL PRIMARY KEY;



--MODIFICACIÓN DE TABLA FICHA PARA ESTADO DE FICHA OBSERVADA ---
ALTER TABLE fichacatastral.fichacatastro_eps ADD fechaobservacion timestamp NULL;
ALTER TABLE fichacatastral.fichacatastro_eps ADD detalleobservacion varchar(255) NULL;
ALTER TABLE fichacatastral.fichacatastro_eps ADD asignado_accioncomercial varchar(3) NULL;




-- ALTER TABLE fichacatastral.clientes ALTER COLUMN telefono TYPE VARCHAR(25);

-- ALTER TABLE fichacatastral.clientes ALTER COLUMN telefono TYPE VARCHAR(25);

-- ALTER TABLE fichacatastral.clientes ALTER COLUMN telefono TYPE VARCHAR(25);

-- ALTER TABLE fichacatastral.clientes ALTER COLUMN telefono TYPE VARCHAR(25);