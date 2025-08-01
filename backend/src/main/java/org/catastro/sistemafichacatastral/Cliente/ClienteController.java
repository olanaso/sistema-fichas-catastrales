package org.catastro.sistemafichacatastral.Cliente;

import org.catastro.sistemafichacatastral.dto.AsiganacionDto;
import org.catastro.sistemafichacatastral.dto.AsignacionMasivoDto;
import org.catastro.sistemafichacatastral.dto.ImportacionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("cliente")
public class ClienteController {

    private ClienteService clienteService;
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarDatos(@RequestBody ImportacionDto dto) {
        try {
            Map<String, Object> resultado = clienteService.ejecutarImportacion(dto);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarFichas(
            @RequestParam List<String> columnas,
            @RequestParam List<String> valores
    ) {
        try {
            String json = clienteService.buscarCliente(columnas, valores);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PutMapping("/asignacion-masiva")
    public ResponseEntity<?> asignacionMasiva(@RequestBody AsignacionMasivoDto dto) {
        try {
            clienteService.asignacionMasiva(dto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Fichas actualizadas correctamente."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PutMapping("/asignacion")
    public ResponseEntity<?> actualizarFicha(@RequestBody AsiganacionDto dto) {
        try {
            clienteService.guardarOActualizarAsiganacion(dto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Ficha actualizada correctamente."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PutMapping("/programacion")
    public ResponseEntity<?> actualizarOEliminarProgramacion(
            @RequestParam String codcreador,
            @RequestParam String accion
    ) {
        try {
            clienteService.actualizarOEliminarProgramacion(codcreador, accion);
            
            String mensaje = accion.equals("GRABAR") 
                ? "Programaciones marcadas como 'Designado' correctamente." 
                : "Programaciones eliminadas correctamente.";
                
            return ResponseEntity.ok(Map.of(
                "success", true, 
                "message", mensaje,
                "codcreador", codcreador,
                "accion", accion
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
