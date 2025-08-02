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



}
