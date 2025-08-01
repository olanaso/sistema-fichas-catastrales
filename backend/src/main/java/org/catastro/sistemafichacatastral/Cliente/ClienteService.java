package org.catastro.sistemafichacatastral.Cliente;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.catastro.sistemafichacatastral.dto.AsiganacionDto;
import org.catastro.sistemafichacatastral.dto.AsignacionMasivoDto;
import org.catastro.sistemafichacatastral.dto.ImportacionDto;
import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ClienteService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Object> ejecutarImportacion(ImportacionDto dto) {
        Map<String, Object> resultado = new HashMap<>();
        String estado = "EXITOSO";
        String tablaClientesBk = null;
        String tablaUnidadesUsoBk = null;
        int cantidadRegistros = 0;
        
        try {
            // 1. Verificar autenticación
            if (!verificarAutenticacion(dto.getUsuario(), dto.getContrasena())) {
                throw new RuntimeException("Usuario o contraseña incorrectos");
            }

            // 2. Ejecutar scripts de migración
            try {
                ejecutarMigracionTiposConstruccion(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de tipos de construcción: " + e.getMessage());
            }
            
            try {
                ejecutarMigracionTiposAlmacenaje(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de tipos de almacenaje: " + e.getMessage());
            }
            
            try {
                ejecutarMigracionTiposAbastecimiento(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de tipos de abastecimiento: " + e.getMessage());
            }
            
            try {
                ejecutarMigracionTiposResponsable(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de tipos de responsable: " + e.getMessage());
            }
            
            try {
                tablaClientesBk = ejecutarMigracionClientes(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de clientes: " + e.getMessage());
            }
            
            try {
                tablaUnidadesUsoBk = ejecutarMigracionUnidadesUso(dto.getUsuario());
            } catch (Exception e) {
                estado = "ERROR";
                throw new RuntimeException("Error en migración de unidades de uso: " + e.getMessage());
            }
            
            // 3. Obtener cantidad de registros de clientes
            cantidadRegistros = obtenerCantidadRegistrosClientes();
            
            // 4. Registrar información en el historico
            registrarInformacionHistorico(dto.getUsuario(), cantidadRegistros, estado, tablaClientesBk, tablaUnidadesUsoBk, dto.getObservacion());
            
            resultado.put("migraciones_completadas", true);
            resultado.put("usuario", dto.getUsuario());
            resultado.put("estado", estado);
            resultado.put("cantidad_registros", cantidadRegistros);
            
        } catch (Exception e) {
            estado = "ERROR";
            resultado.put("success", false);
            resultado.put("error", e.getMessage());
            resultado.put("timestamp", LocalDateTime.now());
            
            // Registrar información incluso si hay error
            try {
                registrarInformacionHistorico(dto.getUsuario(), cantidadRegistros, estado, tablaClientesBk, tablaUnidadesUsoBk, dto.getObservacion());
            } catch (Exception ex) {
                // No lanzar excepción aquí para no interrumpir el proceso principal
                System.err.println("Error al registrar información histórica: " + ex.getMessage());
            }
        }
        
        return resultado;
    }

    private boolean verificarAutenticacion(String usuario, String password) {
        try {
            // 1. Obtener el usuario actualmente logueado
            UsuarioEntity usuarioLogueado = sessionService.getCurrentUser();
            if (usuarioLogueado == null) {
                throw new RuntimeException("No hay usuario autenticado en la sesión");
            }

            // 2. Verificar que el usuario proporcionado coincida con el logueado
            if (!usuarioLogueado.getUsuario().equals(usuario)) {
                throw new RuntimeException("El usuario proporcionado no coincide con el usuario logueado");
            }

            // 3. Verificar que el usuario esté activo
            if (!usuarioLogueado.isActivo()) {
                throw new RuntimeException("El usuario logueado no está activo");
            }

            // 4. Verificar que la contraseña coincida
            if (!passwordEncoder.matches(password, usuarioLogueado.getPassword())) {
                throw new RuntimeException("La contraseña proporcionada es incorrecta");
            }

            return true;
            
        } catch (Exception e) {
            throw new RuntimeException("Error al verificar autenticación: " + e.getMessage());
        }
    }

    private void ejecutarMigracionTiposConstruccion(String creador) {
        try {
            String sql = "SELECT fichacatastral.migrar_tipoconstruccion('001', :creador)";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("creador", creador);
            query.getSingleResult(); // Cambiado de executeUpdate() a getSingleResult()
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de tipos de construcción: " + e.getMessage());
        }
    }

    private void ejecutarMigracionTiposAlmacenaje(String creador) {
        try {
            String sql = "SELECT fichacatastral.migrar_tipoalmacenaje('001', :creador)";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("creador", creador);
            query.getSingleResult(); // Cambiado de executeUpdate() a getSingleResult()
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de tipos de almacenaje: " + e.getMessage());
        }
    }

    private void ejecutarMigracionTiposAbastecimiento(String creador) {
        try {
            String sql = "SELECT fichacatastral.migrar_tipoabastecimiento('001', :creador)";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("creador", creador);
            query.getSingleResult(); // Cambiado de executeUpdate() a getSingleResult()
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de tipos de abastecimiento: " + e.getMessage());
        }
    }

    private void ejecutarMigracionTiposResponsable(String creador) {
        try {
            String sql = "SELECT fichacatastral.migrar_tiporesponsable('001', :creador)";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("creador", creador);
            query.getSingleResult(); // Cambiado de executeUpdate() a getSingleResult()
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de tipos de responsable: " + e.getMessage());
        }
    }

    private String ejecutarMigracionClientes(String creador) {
        try {
            // 1. Crear copia de seguridad de la tabla clientes
            String tablaBackup = crearCopiaSeguridadClientes();
            
            // 2. Limpiar la tabla clientes completamente
            limpiarTablaClientes();
            
            // 3. Insertar nuevos datos desde la vista
            String sql = "INSERT INTO fichacatastral.clientes (" +
                    "codemp, codsuc, codsector, codmza, nrolote, nrosublote, codcliente, codiusua, " +
                    "codcalle, caltip, nrocalle, codurbaso, urbtip, constru, piso, tiposervicio, " +
                    "piscina, tiporeser, tipousuario, propietario, ruc, telefono, estadoservicio_a, " +
                    "diametro_a, tipomterial, materialc, loccaja_a, nro_medidor, fecha_inst, " +
                    "diametro_m, estadoservicio_d, diametro_d, tipomterial_d, caja_d, " +
                    "cant_uso, nrocontrato_sici, reprutrep, contipmul, contipult, prelocali, " +
                    "codcatastral, estadoregistro, sinmora, variasunidadesuso, altocon, precorte, " +
                    "sinmoraotrosser, sinigvotrosser, impedimentocorte, conexionhastacaja, " +
                    "conexiontemporal, desaguexderivacion, fuentepropia, judicializado, infocorp) " +
                    "SELECT " +
                    "v.preregion AS codemp, " +
                    "v.prezona AS codsuc, " +
                    "v.sector AS codsector, " +
                    "v.manzana AS codmza, " +
                    "v.lote AS nrolote, " +
                    "v.sublote AS nrosublote, " +
                    "v.codcliente AS codcliente, " +
                    "v.suministro AS codiusua, " +
                    "CAST(COALESCE(v.precalle, '000') AS INTEGER) AS codcalle, " +
                    "v.\"CALTIP\" AS caltip, " +
                    "v.nro_muni AS nrocalle, " +
                    "v.preurba AS codurbaso, " +
                    "v.\"URBTIP\" AS urbtip, " +
                    "v.tipoconstruccion AS constru, " +
                    "v.piso AS piso, " +
                    "v.codtipser AS tiposervicio, " +
                    "v.cod_piscina AS piscina, " +
                    "v.codtipres AS tiporeser, " +
                    "v.codesclte AS tipousuario, " +
                    "v.cliente AS propietario, " +
                    "v.ruc AS ruc, " +
                    "v.telefono AS telefono, " +
                    "v.codestado AS estadoservicio_a, " +
                    "v.condiacod AS diametro_a, " +
                    "v.conmateri AS tipomterial, " +
                    "v.concajmat AS materialc, " +
                    "v.loccaja_a AS loccaja_a, " +
                    "v.medidor AS nro_medidor, " +
                    "v.fecha_instalacion AS fecha_inst, " +
                    "v.diametro_medidor_cod AS diametro_m, " +
                    "v.condestad AS estadoservicio_d, " +
                    "v.condidcod AS diametro_d, " +
                    "v.conmatdes AS tipomterial_d, " +
                    "v.concajmde AS caja_d, " +
                    "v.cant_uso AS cant_uso, " +
                    "v.\"CONTRA\"::VARCHAR AS nrocontrato_sici, " +
                    "v.\"REPRUTREP\" AS reprutrep, " +
                    "v.\"CONTIPMUL\" AS contipmul, " +
                    "v.\"CONTIPULT\" AS contipult, " +
                    "v.\"PRELOCALI\" AS prelocali, " +
                    "'' AS codcatastral, " +
                    "1 as estadoregistro, " +
                    "1 as sinmora, " +
                    "0 as variasunidadesuso, " +
                    "0 as altocon, " +
                    "0 as precorte, " +
                    "0 as sinmoraotrosser, " +
                    "0 as sinigvotrosser, " +
                    "0 as impedimentocorte, " +
                    "0 as conexionhastacaja, " +
                    "0 as conexiontemporal, " +
                    "0 as desaguexderivacion, " +
                    "0 as fuentepropia, " +
                    "0 as judicializado, " +
                    "0 as infocorp " +
                    "FROM fichacatastral.vista_padron_sici v";
            
            Query query = entityManager.createNativeQuery(sql);
            query.executeUpdate();
            
            return tablaBackup;
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de clientes: " + e.getMessage());
        }
    }

    /**
     * Crea una copia de seguridad de la tabla clientes
     */
    private String crearCopiaSeguridadClientes() {
        try {
            // 1. Eliminar la tabla de backup si existe
            String dropTableSql = "DROP TABLE IF EXISTS fichacatastral.clientes_bk";
            entityManager.createNativeQuery(dropTableSql).executeUpdate();
            
            // 2. Crear la tabla de backup como copia exacta de clientes
            String createTableSql = "CREATE TABLE fichacatastral.clientes_bk AS SELECT * FROM fichacatastral.clientes";
            entityManager.createNativeQuery(createTableSql).executeUpdate();
            
            // 3. Agregar timestamp al nombre de la tabla para identificar la fecha de backup
            String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String nombreTablaBackup = "clientes_bk_" + timestamp;
            String renameTableSql = "ALTER TABLE fichacatastral.clientes_bk RENAME TO " + nombreTablaBackup;
            entityManager.createNativeQuery(renameTableSql).executeUpdate();
            
            return nombreTablaBackup;
            
        } catch (Exception e) {
            throw new RuntimeException("Error al crear copia de seguridad de clientes: " + e.getMessage());
        }
    }

    /**
     * Limpia completamente la tabla clientes
     */
    private void limpiarTablaClientes() {
        try {
            String sql = "DELETE FROM fichacatastral.clientes";
            entityManager.createNativeQuery(sql).executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("Error al limpiar tabla de clientes: " + e.getMessage());
        }
    }

    private String ejecutarMigracionUnidadesUso(String creador) {
        try {
            // 1. Crear copia de seguridad de la tabla uniduso_ant
            String tablaBackup = crearCopiaSeguridadUnidadesUso();
            
            // 2. Limpiar la tabla uniduso_ant completamente
            limpiarTablaUnidadesUso();
            
            // 3. Insertar nuevos datos desde la vista
            String sql = "INSERT INTO fichacatastral.uniduso_ant (" +
                    "id, preregion, nro_uniduso, prezona, codcattar, codscatta, " +
                    "tarifa, codtipten, cant_persona, cliusocod, cant_u_uso, codcliente) " +
                    "SELECT " +
                    "ROW_NUMBER() OVER () AS id, " +
                    "preregion, nro_uniduso, prezona, codcattar, codscatta, " +
                    "tarifa, codtipten, cant_persona, cliusocod, cant_u_uso, codcliente " +
                    "FROM fichacatastral.vista_uduso_sici";
            
            Query query = entityManager.createNativeQuery(sql);
            query.executeUpdate();
            
            return tablaBackup;
        } catch (Exception e) {
            throw new RuntimeException("Error en migración de unidades de uso: " + e.getMessage());
        }
    }

    /**
     * Crea una copia de seguridad de la tabla uniduso_ant
     */
    private String crearCopiaSeguridadUnidadesUso() {
        try {
            // 1. Eliminar la tabla de backup si existe
            String dropTableSql = "DROP TABLE IF EXISTS fichacatastral.uniduso_ant_bk";
            entityManager.createNativeQuery(dropTableSql).executeUpdate();
            
            // 2. Crear la tabla de backup como copia exacta de uniduso_ant
            String createTableSql = "CREATE TABLE fichacatastral.uniduso_ant_bk AS SELECT * FROM fichacatastral.uniduso_ant";
            entityManager.createNativeQuery(createTableSql).executeUpdate();
            
            // 3. Agregar timestamp al nombre de la tabla para identificar la fecha de backup
            String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String nombreTablaBackup = "uniduso_ant_bk_" + timestamp;
            String renameTableSql = "ALTER TABLE fichacatastral.uniduso_ant_bk RENAME TO " + nombreTablaBackup;
            entityManager.createNativeQuery(renameTableSql).executeUpdate();
            
            return nombreTablaBackup;
            
        } catch (Exception e) {
            throw new RuntimeException("Error al crear copia de seguridad de unidades de uso: " + e.getMessage());
        }
    }

    /**
     * Limpia completamente la tabla uniduso_ant
     */
    private void limpiarTablaUnidadesUso() {
        try {
            String sql = "DELETE FROM fichacatastral.uniduso_ant";
            entityManager.createNativeQuery(sql).executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("Error al limpiar tabla de unidades de uso: " + e.getMessage());
        }
    }

    /**
     * Obtiene la cantidad de registros en la tabla clientes
     */
    private int obtenerCantidadRegistrosClientes() {
        try {
            String sql = "SELECT COUNT(*) FROM fichacatastral.clientes";
            Query query = entityManager.createNativeQuery(sql);
            Object result = query.getSingleResult();
            return ((Number) result).intValue();
        } catch (Exception e) {
            System.err.println("Error al obtener cantidad de registros de clientes: " + e.getMessage());
            return 0;
        }
    }

    /**
     * Registra información en la tabla usp_padronhistorico
     */
    private void registrarInformacionHistorico(String creador, int cantidadRegistros, String estado, 
                                              String tablaClientesBk, String tablaUnidadesUsoBk, String observacion) {
        try {
            
            String sql = "INSERT INTO fichacatastral.usp_padronhistorico " +
                        "(creador, cantidad_registros, estado, tablacliente_bk, tablauduso_bk, observacion )" +
                        "VALUES (:creador, :cantidadRegistros, :estado, :tablacliente_bk, :tablauduso_bk, :observacion)";
            
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("creador", creador);
            query.setParameter("cantidadRegistros", cantidadRegistros);
            query.setParameter("estado", estado);
            query.setParameter("tablacliente_bk", tablaClientesBk);
            query.setParameter("tablauduso_bk", tablaUnidadesUsoBk);
            query.setParameter("observacion", observacion);
            query.executeUpdate();
            
        } catch (Exception e) {
            // No lanzar excepción aquí para no interrumpir el proceso principal
            System.err.println("Error al registrar información histórica: " + e.getMessage());
        }
    }


    public String buscarCliente(List<String> columnas, List<String> valores) {
        try {
            if (columnas == null || valores == null || columnas.size() != valores.size()) {
                throw new IllegalArgumentException("El número de columnas y valores debe coincidir.");
            }

            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_buscar_cliente(?1, ?2)"
            );
            query.setParameter(1, columnas.toArray(new String[0]));
            query.setParameter(2, valores.toArray(new String[0]));

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";

        } catch (Exception e) {
            throw new RuntimeException("Error al buscar ficha catastral: " + e.getMessage(), e);
        }
    }

    /** ASIGANACIÓN DE CLIENTE **/

    public void asignacionMasiva(AsignacionMasivoDto dto) {
        if (dto.getCodclientes() == null || dto.getCodclientes().isEmpty()) {
            throw new IllegalArgumentException("Debe proporcionar al menos un código de cliente.");
        }

        String sql = "INSERT INTO fichacatastral.usp_programacion_trabajo " +
                "(codcliente, codinspector, estado, codcreador, fecha_visita, observaciones, codbrigada) " +
                "VALUES (:codcliente, :codinspector, :estado, :codcreador, :fecha_visita, :observaciones, :codbrigada)";

        for (Integer codcliente : dto.getCodclientes()) {
            entityManager.createNativeQuery(sql)
                    .setParameter("codcliente", codcliente)
                    .setParameter("codinspector", dto.getCodinspector())
                    .setParameter("estado", dto.getEstado())
                    .setParameter("codcreador", dto.getCodcreador())
                    .setParameter("fecha_visita", dto.getFecha_visita())
                    .setParameter("observaciones", dto.getObservaciones())
                    .setParameter("codbrigada", dto.getCodbrigada())
                    .executeUpdate();
        }
    }

    public void guardarOActualizarAsiganacion(AsiganacionDto dto) {
        try {
            String sql = "INSERT INTO fichacatastral.usp_programacion_trabajo " +
                    "(codcliente, codinspector, estado, codcreador, fecha_visita, observaciones, codbrigada) " +
                    "VALUES (:codcliente, :codinspector, :estado, :codcreador, :fecha_visita, :observaciones, :codbrigada) " +
                    "ON CONFLICT (codcliente) DO UPDATE SET " +
                    "codinspector = EXCLUDED.codinspector, " +
                    "estado = EXCLUDED.estado, " +
                    "codcreador = EXCLUDED.codcreador, " +
                    "fecha_visita = EXCLUDED.fecha_visita, " +
                    "observaciones = EXCLUDED.observaciones, " +
                    "codbrigada = EXCLUDED.codbrigada";

            entityManager.createNativeQuery(sql)
                    .setParameter("codcliente", dto.getCodcliente())
                    .setParameter("codinspector", dto.getCodinspector())
                    .setParameter("estado", dto.getEstado())
                    .setParameter("codcreador", dto.getCodcreador())
                    .setParameter("fecha_visita", dto.getFecha_visita())
                    .setParameter("observaciones", dto.getObservaciones())
                    .setParameter("codbrigada", dto.getCodbrigada())
                    .executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException("Error al guardar o actualizar la ficha: " + e.getMessage(), e);
        }
    }

    /**
     * Actualiza o elimina programaciones de trabajo
     * @param codcreador Código del usuario creador
     * @param accion Acción a realizar: 'GRABAR' para marcar como "Designado" o 'ELIMINAR' para eliminar programaciones
     */
    public void actualizarOEliminarProgramacion(String codcreador, String accion) {
        try {
            if (codcreador == null || codcreador.trim().isEmpty()) {
                throw new IllegalArgumentException("El código del creador no puede estar vacío");
            }
            
            if (accion == null || (!accion.equals("GRABAR") && !accion.equals("ELIMINAR"))) {
                throw new IllegalArgumentException("La acción debe ser 'GRABAR' o 'ELIMINAR'");
            }

            String sql = "SELECT fichacatastral.usp_actualizar_eliminar_programacion(:codcreador, :accion)";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("codcreador", codcreador);
            query.setParameter("accion", accion);
            query.getSingleResult();

        } catch (Exception e) {
            throw new RuntimeException("Error al " + accion.toLowerCase() + " programaciones: " + e.getMessage(), e);
        }
    }

    

}
