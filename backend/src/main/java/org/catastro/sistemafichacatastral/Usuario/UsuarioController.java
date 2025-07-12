package org.catastro.sistemafichacatastral.Usuario;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeMyPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioUpdateDto;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.catastro.sistemafichacatastral.dto.InspectorDTO;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.catastro.sistemafichacatastral.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UsuarioEntity>>> getAllUsuarios() {
        try {
            List<UsuarioEntity> usuarios = usuarioService.findAll();
            return ResponseEntity.ok(ApiResponse.success("Usuarios obtenidos exitosamente", usuarios));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener usuarios: " + e.getMessage()));
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioEntity>> getUsuarioById(@PathVariable int id) {
        try {
            UsuarioEntity usuario = usuarioService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
            return ResponseEntity.ok(ApiResponse.success("Usuario encontrado", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener usuario: " + e.getMessage()));
        }
    }

    @GetMapping("/session-info")
    public ResponseEntity<ApiResponse<Object>> getSessionInfo() {
        try {
            UsuarioEntity usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                var sessionInfo = new java.util.HashMap<String, Object>();
                sessionInfo.put("userId", sessionService.getCurrentUserId());
                sessionInfo.put("userEmail", sessionService.getCurrentUserEmail());
                sessionInfo.put("userName", usuario.getNombre() + " " + usuario.getApellidopa() + " " +  usuario.getApellidoma());
                
                return ResponseEntity.ok(ApiResponse.success("Información de sesión obtenida", sessionInfo));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener información de sesión: " + e.getMessage()));
        }
    }

    @GetMapping("/inspectores")
    public ResponseEntity<ApiResponse<List<InspectorDTO>>> getInspectores(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        try {
            List<InspectorDTO> inspectores = usuarioService.obtenerInspectores(limit, offset);
            return ResponseEntity.ok(ApiResponse.success("Inspectores obtenidos exitosamente", inspectores));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: " + e.getMessage()));
        }
    }
}
