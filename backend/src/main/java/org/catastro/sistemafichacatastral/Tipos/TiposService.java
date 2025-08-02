package org.catastro.sistemafichacatastral.Tipos;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TiposService {

    @PersistenceContext
    private EntityManager entityManager;

    public String obtenerDataComoJson(String nombreTabla) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_obtener_tabla_como_json(?1)");
            query.setParameter(1, nombreTabla);
            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener datos en formato JSON: " + e.getMessage(), e);
        }
    }

    public String obtenerTablaJsonPaginadoConTotal(String tabla, int limit, int offset, String valorBusqueda, String[] columnas) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_obtener_tabla_json_paginado_total(?1, ?2, ?3, ?4, ?5)");
            query.setParameter(1, tabla);
            query.setParameter(2, limit);
            query.setParameter(3, offset);
            query.setParameter(4, valorBusqueda != null ? valorBusqueda : "");
            query.setParameter(5, columnas);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "{\"total\":0,\"data\":[]}";
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener JSON paginado con total: " + e.getMessage(), e);
        }
    }

    public String buscarPorColumna(String tabla, String columna, String valor) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_buscar_por_columna(?1, ?2, ?3)"
            );
            query.setParameter(1, tabla);
            query.setParameter(2, columna);
            query.setParameter(3, valor);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";
        } catch (Exception e) {
            throw new RuntimeException("Error al buscar en la tabla: " + e.getMessage(), e);
        }
    }

    public String buscarPorCamposExactos(String tabla, List<String> columnas, List<String> valores) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_buscar_por_campos_exactos(?1, ?2, ?3)"
            );
            query.setParameter(1, tabla);
            query.setParameter(2, columnas.toArray(new String[0]));
            query.setParameter(3, valores.toArray(new String[0]));

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";
        } catch (Exception e) {
            throw new RuntimeException("Error al buscar por campos exactos: " + e.getMessage(), e);
        }
    }

    public String buscarPorCoincidencia(String tabla, List<String> columnas, String termino) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_buscar_por_coincidencia(?1, ?2, ?3)"
            );
            query.setParameter(1, tabla);
            query.setParameter(2, columnas.toArray(new String[0]));
            query.setParameter(3, termino);

            Object result = query.getSingleResult();
            return result != null ? result.toString() : "[]";
        } catch (Exception e) {
            throw new RuntimeException("Error al buscar por coincidencia: " + e.getMessage(), e);
        }
    }

    public Integer obtenerCantidadPorFiltros(String tabla, List<String> columnas, List<String> valores) {
        try {
            Query query;
            if (columnas == null || columnas.isEmpty() || valores == null || valores.isEmpty()) {
                // Llamada sin filtros
                query = entityManager.createNativeQuery("SELECT fichacatastral.usp_obtener_total(?1)");
                query.setParameter(1, tabla);
            } else {
                query = entityManager.createNativeQuery(
                        "SELECT fichacatastral.usp_obtener_cantidad_por_filtros(?1, ?2, ?3)"
                );
                query.setParameter(1, tabla);
                query.setParameter(2, columnas.toArray(new String[0]));
                query.setParameter(3, valores.toArray(new String[0]));
            }
            Object result = query.getSingleResult();
            return result != null ? Integer.valueOf(result.toString()) : 0;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener cantidad por filtros: " + e.getMessage(), e);
        }
    }

}
