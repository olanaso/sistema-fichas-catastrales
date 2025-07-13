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
}
