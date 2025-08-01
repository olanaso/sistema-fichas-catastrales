package org.catastro.sistemafichacatastral.fichacatastral;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.images.ClassPathImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.catastro.sistemafichacatastral.Project;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Service
public class FichaCatastralService {

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

}
