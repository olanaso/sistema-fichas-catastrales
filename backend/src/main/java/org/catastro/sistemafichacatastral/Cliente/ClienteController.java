package org.catastro.sistemafichacatastral.Cliente;

import org.catastro.sistemafichacatastral.FichasCatastrales.FichasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("cliente")
public class ClienteController {

    private ClienteService clienteService;
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
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

}
