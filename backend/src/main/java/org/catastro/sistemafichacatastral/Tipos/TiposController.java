package org.catastro.sistemafichacatastral.Tipos;

import org.catastro.sistemafichacatastral.dto.JsonInsertRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("tipos")
public class TiposController {

    private final TiposService tiposService;

    public TiposController(TiposService tiposService) {
        this.tiposService = tiposService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorColumna(
            @RequestParam String tabla,
            @RequestParam String columna,
            @RequestParam String valor
    ) {
        try {
            String resultado = tiposService.buscarPorColumna(tabla, columna, valor);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/buscar-exacto")
    public ResponseEntity<?> buscarPorCamposExactos(
            @RequestParam String tabla,
            @RequestParam List<String> columnas,
            @RequestParam List<String> valores
    ) {
        try {
            String resultado = tiposService.buscarPorCamposExactos(tabla, columnas, valores);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/buscar-coincidencia")
    public ResponseEntity<?> buscarPorCoincidencia(
            @RequestParam String tabla,
            @RequestParam List<String> columnas,
            @RequestParam String termino
    ) {
        try {
            String resultado = tiposService.buscarPorCoincidencia(tabla, columnas, termino);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }


    @GetMapping("/obtener")
    public ResponseEntity<?> obtenerTablaJson(@RequestParam String tabla) {
        try {
            String json = tiposService.obtenerDataComoJson(tabla);
            return ResponseEntity.ok().body(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/obtener-paginado")
    public ResponseEntity<?> obtenerTablaPaginadoJson(
            @RequestParam String tabla,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        try {
            String json = tiposService.obtenerTablaJsonPaginadoConTotal(tabla, limit, offset);
            return ResponseEntity.ok(json); // json ya es string con estructura total + data
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
