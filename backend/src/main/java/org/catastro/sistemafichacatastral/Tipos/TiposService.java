package org.catastro.sistemafichacatastral.Tipos;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TiposService {

    @PersistenceContext
    private EntityManager entityManager;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String obtenerDataComoJson(String nombreTabla) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.obtener_tabla_como_json(?1)");
            query.setParameter(1, nombreTabla);
            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener datos en formato JSON: " + e.getMessage(), e);
        }
    }

    public String obtenerTablaJsonPaginadoConTotal(String tabla, int limit, int offset) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.obtener_tabla_json_paginado_total(?1, ?2, ?3)");
            query.setParameter(1, tabla);
            query.setParameter(2, limit);
            query.setParameter(3, offset);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "{\"total\":0,\"data\":[]}";
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener JSON paginado con total: " + e.getMessage(), e);
        }
    }

    public String insertarEnTabla(String tabla, String jsonb) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.insertar_en_tabla(?1, ?2::jsonb)"
            );

            query.setParameter(1, tabla);
            query.setParameter(2, jsonb);

            return (String) query.getSingleResult();

        } catch (Exception e) {
            throw new RuntimeException("Error al insertar en tabla: " + e.getMessage(), e);
        }
    }

}
