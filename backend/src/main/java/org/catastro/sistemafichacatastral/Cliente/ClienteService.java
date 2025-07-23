package org.catastro.sistemafichacatastral.Cliente;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.catastro.sistemafichacatastral.dto.AsiganacionDto;
import org.catastro.sistemafichacatastral.dto.AsignacionMasivoDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ClienteService {


    @PersistenceContext
    private EntityManager entityManager;

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
}
