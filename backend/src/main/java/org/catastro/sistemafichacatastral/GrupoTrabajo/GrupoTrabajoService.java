package org.catastro.sistemafichacatastral.GrupoTrabajo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GrupoTrabajoService {

    private final EntityManager entityManager;

    public GrupoTrabajoService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public String upsertGrupoTrabajoJson(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_upsert_grupotrabajo(?::jsonb)");
            query.setParameter(1, json);
            return (String) query.getSingleResult();
        } catch (PersistenceException e) {
            throw new RuntimeException("Error al insertar o actualizar grupo de trabajo: " + e.getMessage(), e);
        }
    }
    
    public String getDataGrupoInspectoresPaginado(int limit, int offset) {
        try {
            Query query = entityManager.createNativeQuery(
                    "WITH datos AS (" +
                            "    SELECT gt.codgrupo, gt.nombre, gt.activo, gt.codlider, COUNT(i.codbrigada) AS inspectores, MAX(i.fechareg) AS ultima_fecha " +
                            "    FROM fichacatastral.usp_grupotrabajo gt " +
                            "    LEFT JOIN fichacatastral.inspectores i ON i.codbrigada = gt.codgrupo " +
                            "    GROUP BY gt.codgrupo, gt.nombre, gt.activo, gt.codlider" +
                            "), " +
                            "total AS (SELECT COUNT(*) AS total_count FROM datos), " +
                            "paginado AS ( " +
                            "    SELECT * FROM datos " +
                            "    ORDER BY ultima_fecha DESC NULLS LAST " +
                            "    LIMIT :limit OFFSET :offset" +
                            ") " +
                            "SELECT json_build_object(" +
                            "    'total', (SELECT total_count FROM total), " +
                            "    'data', COALESCE(json_agg(paginado), '[]'::json)" +
                            ") " +
                            "FROM paginado"
            );

            query.setParameter("limit", limit);
            query.setParameter("offset", offset);

            return (String) query.getSingleResult();

        } catch (PersistenceException e) {
            throw new RuntimeException("Error al obtener grupos con inspectores: " + e.getMessage(), e);
        }
    }
}
