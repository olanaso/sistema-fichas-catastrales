package org.catastro.sistemafichacatastral.FichasCatastrales;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.opensagres.xdocreport.document.json.JSONArray;
import fr.opensagres.xdocreport.document.json.JSONObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.catastro.sistemafichacatastral.fichacatastral.FichaCatastro;
import org.catastro.sistemafichacatastral.fichacatastral.FichaCatastroEpsUnidUso;
import org.catastro.sistemafichacatastral.FichasCatastrales.dto.UnidadUsoDto;
import org.catastro.sistemafichacatastral.FichasCatastrales.dto.ActualizarFichaDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    public FichaCatastro obtenerDataFichaCatastroJSON(Integer codcliente) {
        try {
            // Ejecutar procedimiento
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.usp_ficha_catastral_json(?1)"
            );
            query.setParameter(1, codcliente);

            Object result = query.getSingleResult();
            if (result == null) {
                throw new RuntimeException("No se encontró información para el cliente: " + codcliente);
            }

            // Crear JSONObject directamente del resultado
            JSONObject jsonObject = new JSONObject(result.toString());

            // Ejemplo de acceso directo con JSONObject
            System.out.println("Región: " + jsonObject.optString("region", "N/D"));

            if (jsonObject.has("list_fichacatastro_epsuniduso")) {
                JSONArray listaJson = jsonObject.getJSONArray("list_fichacatastro_epsuniduso");
                if (listaJson.length() > 0) {
                    JSONObject item = listaJson.getJSONObject(0);
                    System.out.println("Tarifa: " + item.optString("tarifa", "N/D"));
                }
            }

            // Usar ObjectMapper con el JSONObject como fuente
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            FichaCatastro retorno = mapper.readValue(jsonObject.toString(), FichaCatastro.class);

            return retorno;

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

    public String registrarUnidadUso(UnidadUsoDto unidadUsoDto) {
        try {
            Query query = entityManager.createNativeQuery(
                    "INSERT INTO fichacatastral.fichacatastro_epsuniduso (" +
                    "codemp, codcliente, tarifa, actividad, cantidad, razonsocial, referencia, idficha" +
                    ") VALUES ('001', ?1, ?2, ?3, ?4, ?5, ?6, ?7)"
            );
            
            query.setParameter(1, unidadUsoDto.getCodcliente());
            query.setParameter(2, unidadUsoDto.getTarifa());
            query.setParameter(3, unidadUsoDto.getActividad());
            query.setParameter(4, unidadUsoDto.getCantidad());
            query.setParameter(5, unidadUsoDto.getRazonsocial());
            query.setParameter(6, unidadUsoDto.getReferencia());
            query.setParameter(7, unidadUsoDto.getIdficha());

            int result = query.executeUpdate();
            
            if (result > 0) {
                return "{\"success\": true, \"message\": \"Unidad de uso registrada exitosamente\"}";
            } else {
                return "{\"success\": false, \"message\": \"No se pudo registrar la unidad de uso\"}";
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al registrar unidad de uso: " + e.getMessage(), e);
        }
    }

    public String eliminarUnidadUsoPorItem(Integer item, Integer idficha) {
        try {
            Query query = entityManager.createNativeQuery(
                    "DELETE FROM fichacatastral.fichacatastro_epsuniduso " +
                    "WHERE item = ?1 AND idficha = ?2"
            );
            
            query.setParameter(1, item);
            query.setParameter(2, idficha);

            int result = query.executeUpdate();
            
            if (result > 0) {
                return "{\"success\": true, \"message\": \"Unidad de uso eliminada exitosamente\"}";
            } else {
                return "{\"success\": false, \"message\": \"No se encontró la unidad de uso para eliminar\"}";
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar unidad de uso: " + e.getMessage(), e);
        }
    }

    public String eliminarUnidadUsoPorIdFicha(Integer idficha) {
        try {
            Query query = entityManager.createNativeQuery(
                    "DELETE FROM fichacatastral.fichacatastro_epsuniduso " +
                    "WHERE idficha = ?1"
            );
            
            query.setParameter(1, idficha);

            int result = query.executeUpdate();
            
            if (result > 0) {
                return "{\"success\": true, \"message\": \"Unidades de uso eliminadas exitosamente\", \"registrosEliminados\": " + result + "}";
            } else {
                return "{\"success\": false, \"message\": \"No se encontraron unidades de uso para eliminar\"}";
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar unidades de uso: " + e.getMessage(), e);
        }
    }

    public String actualizarFichaCatastro(ActualizarFichaDto actualizarFichaDto) {
        try {
            // Validar que los arrays tengan la misma longitud
            if (actualizarFichaDto.getColumnas() == null || actualizarFichaDto.getValores() == null ||
                actualizarFichaDto.getColumnas().size() != actualizarFichaDto.getValores().size()) {
                throw new IllegalArgumentException("Los arrays de columnas y valores deben tener la misma longitud.");
            }

            // Validar que idficha no sea null
            if (actualizarFichaDto.getIdficha() == null) {
                throw new IllegalArgumentException("El ID de ficha es requerido.");
            }

            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.actualizar_fichacatastro_eps(?1, ?2, ?3)"
            );
            
            query.setParameter(1, actualizarFichaDto.getIdficha());
            query.setParameter(2, actualizarFichaDto.getColumnas().toArray(new String[0]));
            query.setParameter(3, actualizarFichaDto.getValores().toArray(new String[0]));

            Object result = query.getSingleResult();
            
            if (result != null) {
                return "{\"success\": true, \"message\": \"Ficha catastral actualizada exitosamente\", \"resultado\": \"" + result.toString() + "\"}";
            } else {
                return "{\"success\": false, \"message\": \"No se pudo actualizar la ficha catastral\"}";
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar ficha catastral: " + e.getMessage(), e);
        }
    }


}
