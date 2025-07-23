package org.catastro.sistemafichacatastral.FichasCatastrales;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("fichas-catastrales")
public class FichasController {

    private FichasService fichasService;
    public FichasController(FichasService fichasService) {
        this.fichasService = fichasService;
    }


    @GetMapping("/buscar")
    public ResponseEntity<?> buscarFichas(
            @RequestParam List<String> columnas,
            @RequestParam List<String> valores
    ) {
        try {
            String json = fichasService.buscarFichaCatastro(columnas, valores);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/obtener-detalle")
    public ResponseEntity<?> obtenerDetalleFicha(
            @RequestParam Integer codcliente
    ) {
        try {
            String json = fichasService.obtenerDataCompletaFichaCatastro(codcliente);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

}
