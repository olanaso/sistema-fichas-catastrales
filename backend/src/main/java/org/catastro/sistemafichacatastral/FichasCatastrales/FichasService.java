package org.catastro.sistemafichacatastral.FichasCatastrales;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.catastro.sistemafichacatastral.dto.FichaUpdateDto;
import org.catastro.sistemafichacatastral.dto.FichaUpdateMasivoDto;
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

    public void actualizarFicha(FichaUpdateDto dto) {
        try {
            Query query = entityManager.createNativeQuery(
                    "UPDATE fichacatastral.fichacatastro_eps SET " +
                            "inspector = ?1, " +
                            "encuestador = ?2, " +
                            "fecha_visita = ?3, " +
                            "observacion = ?4, " +
                            "codbrigada = ?5 " +
                            "WHERE idficha = ?6"
            );

            query.setParameter(1, dto.getInspector());
            query.setParameter(2, dto.getEncuestador());
            query.setParameter(3, dto.getFechaVisita());
            query.setParameter(4, dto.getObservacion()); // puede ser null
            query.setParameter(5, dto.getCodbrigada());
            query.setParameter(6, dto.getIdficha());

            int filasAfectadas = query.executeUpdate();
            if (filasAfectadas == 0) {
                throw new RuntimeException("No se encontró la ficha con idficha: " + dto.getIdficha());
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar la ficha: " + e.getMessage(), e);
        }
    }

    public void actualizarMasivo(FichaUpdateMasivoDto dto) {
        if (dto.getIdfichas() == null || dto.getIdfichas().isEmpty()) {
            throw new IllegalArgumentException("Debe proporcionar al menos un ID de ficha.");
        }

        String sql = "UPDATE fichacatastral.fichacatastro_eps SET " +
                "inspector = :inspector, " +
                "encuestador = :encuestador, " +
                "fecha_visita = :fechaVisita, " +
                "observacion = :observacion, " +
                "codbrigada = :codbrigada " +
                "WHERE idficha IN :ids";

        entityManager.createNativeQuery(sql)
                .setParameter("inspector", dto.getInspector())
                .setParameter("encuestador", dto.getEncuestador())
                .setParameter("fechaVisita", dto.getFechaVisita())
                .setParameter("observacion", dto.getObservacion())
                .setParameter("codbrigada", dto.getCodbrigada())
                .setParameter("ids", dto.getIdfichas())
                .executeUpdate();
    }

}
