package org.catastro.sistemafichacatastral.GrupoTrabajo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
