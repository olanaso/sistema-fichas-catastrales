package org.catastro.sistemafichacatastral.FichasCatastrales;

import org.catastro.sistemafichacatastral.FichasCatastrales.dto.UnidadUsoDto;
import org.catastro.sistemafichacatastral.FichasCatastrales.dto.ActualizarFichaDto;
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

    @GetMapping("/obtener-tarifas")
    public ResponseEntity<?> obtenerTarifas(
            @RequestParam Integer idficha,
            @RequestParam Integer codcliente
    ) {
        try {
            String json = fichasService.obtenerTarifas(idficha, codcliente);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/unidad-uso/registrar")
    public ResponseEntity<?> registrarUnidadUso(@RequestBody UnidadUsoDto unidadUsoDto) {
        try {
            String json = fichasService.registrarUnidadUso(unidadUsoDto);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/unidad-uso/eliminar-por-item")
    public ResponseEntity<?> eliminarUnidadUsoPorItem(
            @RequestParam Integer item,
            @RequestParam Integer idficha
    ) {
        try {
            String json = fichasService.eliminarUnidadUsoPorItem(item, idficha);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/unidad-uso/eliminar-por-ficha")
    public ResponseEntity<?> eliminarUnidadUsoPorIdFicha(@RequestParam Integer idficha) {
        try {
            String json = fichasService.eliminarUnidadUsoPorIdFicha(idficha);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarFichaCatastro(@RequestBody ActualizarFichaDto actualizarFichaDto) {
        try {
            String json = fichasService.actualizarFichaCatastro(actualizarFichaDto);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

}
