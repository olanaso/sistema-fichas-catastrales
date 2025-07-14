package org.catastro.sistemafichacatastral.Padron;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PadronService {
    private final EntityManager entityManager;

    public PadronService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public String upsertPadronHistorico(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_upsert_padronhistorico(?::jsonb)");
            query.setParameter(1, json);
            return (String) query.getSingleResult();
        } catch (PersistenceException e) {
            throw new RuntimeException("Error al insertar o actualizar grupo de trabajo: " + e.getMessage(), e);
        }
    }
}
