package org.catastro.sistemafichacatastral.FichasCatastrales;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FichasService {
    @PersistenceContext
    private EntityManager entityManager;

    public String buscarFichaCatastro(List<String> columnas, List<String> valores) {
        try {
            if (columnas == null || valores == null || columnas.size() != valores.size()) {
                throw new IllegalArgumentException("El número de columnas y valores debe coincidir.");
            }

            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_buscar_fichacatastro_eps(?1, ?2)"
            );
            query.setParameter(1, columnas.toArray(new String[0]));
            query.setParameter(2, valores.toArray(new String[0]));

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";

        } catch (Exception e) {
            throw new RuntimeException("Error al buscar ficha catastral: " + e.getMessage(), e);
        }
    }

    public String obtenerDataCompletaFichaCatastro(Integer codcliente) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_clientefichacatastro_jdon(?1)"
            );
            query.setParameter(1, codcliente);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";

        } catch (Exception e) {
            throw new RuntimeException("Error al buscar ficha catastral: " + e.getMessage(), e);
        }
    }

    public String obtenerTarifas(Integer idficha, Integer codcliente) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_obtener_tarifas(?1, ?2)"
            );
            query.setParameter(1, idficha);
            query.setParameter(2, codcliente);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener tarifas: " + e.getMessage(), e);
        }
    }

}
