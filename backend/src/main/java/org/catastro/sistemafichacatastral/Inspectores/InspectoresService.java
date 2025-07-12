package org.catastro.sistemafichacatastral.Inspectores;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InspectoresService {

    private final EntityManager entityManager;

    public InspectoresService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public String upsertInspectorJson(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_upsert_inspector(?::jsonb)");
            query.setParameter(1, json);
            return (String) query.getSingleResult();
        } catch (PersistenceException e) {
            throw new RuntimeException("Error al insertar o actualizar usuario: " + e.getMessage(), e);
        }
    }
}
