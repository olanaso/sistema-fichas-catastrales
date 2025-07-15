package org.catastro.sistemafichacatastral.transversal;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeMyPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;
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

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class TransversalController {

    @Autowired
    private org.catastro.sistemafichacatastral.Usuario.Usuario.TransversalService usuarioService;

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

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioEntity>> updateUsuario(@PathVariable int id, @Valid @RequestBody UsuarioUpdateDto usuarioUpdateDto) {
        try {
            UsuarioEntity updatedUsuario = usuarioService.updateWithDto(id, usuarioUpdateDto);
            return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", updatedUsuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar usuario: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/change-password")
    public ResponseEntity<ApiResponse<UsuarioEntity>> changePassword(@PathVariable int id, @Valid @RequestBody ChangeUserPasswordDto changePasswordDto) {
        try {
            UsuarioEntity usuario = usuarioService.changePassword(id, changePasswordDto);
            return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/toggle-activo")
    public ResponseEntity<ApiResponse<UsuarioEntity>> toggleActivo(@PathVariable int id) {
        try {
            UsuarioEntity usuario = usuarioService.toggleActivo(id);
            String estado = usuario.isActivo() ? "activado" : "desactivado";
            return ResponseEntity.ok(ApiResponse.success("Usuario " + estado + " exitosamente", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al cambiar estado del usuario: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UsuarioEntity>> registerUsuario(@Valid @RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            UsuarioEntity usuario = usuarioService.createWithSpecificRole(usuarioRegisterDto);
            return ResponseEntity.ok(ApiResponse.success("Usuario registrado exitosamente", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al registrar usuario: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UsuarioEntity>> getCurrentUser() {
        try {
            UsuarioEntity usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                return ResponseEntity.ok(ApiResponse.success("Información del usuario obtenida", usuario));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener información del usuario: " + e.getMessage()));
        }
    }

    @GetMapping("/session-info")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
    public ResponseEntity<ApiResponse<Object>> getSessionInfo() {
        try {
            UsuarioEntity usuario = sessionService.getCurrentUser();
            if (usuario != null) {
                var sessionInfo = new java.util.HashMap<String, Object>();
                sessionInfo.put("userId", sessionService.getCurrentUserId());
                sessionInfo.put("userEmail", sessionService.getCurrentUserEmail());
                sessionInfo.put("userName", usuario.getNombres() + " " + usuario.getApellidos());
                
                return ResponseEntity.ok(ApiResponse.success("Información de sesión obtenida", sessionInfo));
            } else {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener información de sesión: " + e.getMessage()));
        }
    }

    /**
     * Cambia la contraseña del usuario logueado
     * Endpoint: PATCH /usuarios/change-my-password
     */
    @PatchMapping("/change-my-password")
    public ResponseEntity<ApiResponse<UsuarioEntity>> changeMyPassword(@Valid @RequestBody ChangeMyPasswordDto changePasswordDto) {
        try {
            UsuarioEntity currentUser = sessionService.getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body(ApiResponse.error("Usuario no autenticado"));
            }
            
            UsuarioEntity usuario = usuarioService.changeMyPassword(currentUser, changePasswordDto);
            return ResponseEntity.ok(ApiResponse.success("Contraseña cambiada exitosamente", usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al cambiar contraseña: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }


    public boolean isValidJson(String json) {
        try {
            objectMapper.readTree(json);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @PostMapping("/saveUsuario")
    public ResponseEntity<ApiResponse<UsuarioEntity>> saveUsuario(@RequestBody String json) {
        if (!isValidJson(json)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("JSON inválido"));
        }
        try {
            UsuarioEntity usuario = usuarioService.upsertUsuarioJson(json);
            return ResponseEntity.ok(ApiResponse.success("Usuario guardado exitosamente", usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: " + e.getMessage()));
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
