package org.catastro.sistemafichacatastral.Inspectores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/inspectores")
@CrossOrigin(origins = "*")
public class InspectoresController {

    @Autowired
    private InspectoresService inspectoresService;

    @PostMapping("/upsert")
    public ResponseEntity<?> upsertUsuario(@RequestBody String dataJson) {
        try {
            String resultado = inspectoresService.upsertInspectorJson(dataJson);
            return ResponseEntity.ok(Map.of("success", true, "message", resultado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
