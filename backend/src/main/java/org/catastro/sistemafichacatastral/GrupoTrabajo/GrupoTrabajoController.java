package org.catastro.sistemafichacatastral.GrupoTrabajo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("grupo-trabajo")
public class GrupoTrabajoController {

    @Autowired
    private GrupoTrabajoService grupoTrabajoService;

    @PostMapping("/upsert")
    public ResponseEntity<?> upsertGrupoTrabajo(@RequestBody String dataJson) {
        try {
            String resultado = grupoTrabajoService.upsertGrupoTrabajoJson(dataJson);
            return ResponseEntity.ok(Map.of("success", true, "message", resultado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/grupos-inspectores")
    public ResponseEntity<?> obtenerGruposConInspectores(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        try {
            String resultado = grupoTrabajoService.getDataGrupoInspectoresPaginado(limit, offset);
            return ResponseEntity.ok().body(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }
}
