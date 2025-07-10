package org.catastro.sistemafichacatastral.Usuario;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.catastro.sistemafichacatastral.audit.AuditService;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeMyPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioUpdateDto;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
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
    private AuditService auditService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<List<UsuarioEntity>>> getAllUsuarios() {
        try {
            List<UsuarioEntity> usuarios = usuarioService.findAll();
            return ResponseEntity.ok(ApiResponse.success("Usuarios obtenidos exitosamente", usuarios));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener usuarios: " + e.getMessage()));
        }
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<List<UsuarioEntity>>> filterUsuarios(
            @RequestParam(required = false) Long rolId,
            @RequestParam(required = false) String nombre) {
        try {
            List<UsuarioEntity> usuarios = usuarioService.findByRolAndNombre(rolId, nombre);
            return ResponseEntity.ok(ApiResponse.success("Usuarios filtrados exitosamente", usuarios));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al filtrar usuarios: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> updateUsuario(@PathVariable int id, @Valid @RequestBody UsuarioUpdateDto usuarioUpdateDto) {
        try {
            UsuarioEntity updatedUsuario = usuarioService.updateWithDto(id, usuarioUpdateDto);
            auditService.logSuccess("ACTUALIZAR_USUARIO", "/usuarios/" + id, 
                "Usuario actualizado: " + updatedUsuario.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", updatedUsuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            auditService.logError("ACTUALIZAR_USUARIO", "/usuarios/" + id, 
                "Error al actualizar usuario: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar usuario: " + e.getMessage()));
        } catch (Exception e) {
            auditService.logError("ACTUALIZAR_USUARIO", "/usuarios/" + id, 
                "Error interno del servidor: " + e.getMessage());
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/change-password")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> changePassword(@PathVariable int id, @Valid @RequestBody ChangeUserPasswordDto changePasswordDto) {
        try {
            UsuarioEntity usuario = usuarioService.changePassword(id, changePasswordDto);
            auditService.logSuccess("CAMBIAR_CONTRASEÑA", "/usuarios/" + id + "/change-password", 
                "Contraseña cambiada para usuario: " + usuario.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Contraseña cambiada exitosamente", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            auditService.logError("CAMBIAR_CONTRASEÑA", "/usuarios/" + id + "/change-password", 
                "Error al cambiar contraseña: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al cambiar contraseña: " + e.getMessage()));
        } catch (Exception e) {
            auditService.logError("CAMBIAR_CONTRASEÑA", "/usuarios/" + id + "/change-password", 
                "Error interno del servidor: " + e.getMessage());
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/toggle-activo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> toggleActivo(@PathVariable int id) {
        try {
            UsuarioEntity usuario = usuarioService.toggleActivo(id);
            String estado = usuario.isActivo() ? "activado" : "desactivado";
            auditService.logSuccess("TOGGLE_ACTIVO", "/usuarios/" + id + "/toggle-activo", 
                "Usuario " + estado + ": " + usuario.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Usuario " + estado + " exitosamente", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            auditService.logError("TOGGLE_ACTIVO", "/usuarios/" + id + "/toggle-activo", 
                "Error al cambiar estado del usuario: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al cambiar estado del usuario: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> registerUsuario(@Valid @RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            UsuarioEntity usuario = usuarioService.createWithSpecificRole(usuarioRegisterDto);
            auditService.logSuccess("REGISTRO_USUARIO", "/usuarios/register", 
                "Usuario registrado: " + usuario.getEmail() + " con rol ID: " + usuarioRegisterDto.getIdRol());
            return ResponseEntity.ok(ApiResponse.success("Usuario registrado exitosamente", usuario));
        } catch (RuntimeException e) {
            auditService.logError("REGISTRO_USUARIO", "/usuarios/register", 
                "Error al registrar usuario: " + e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al registrar usuario: " + e.getMessage()));
        } catch (Exception e) {
            auditService.logError("REGISTRO_USUARIO", "/usuarios/register", 
                "Error interno del servidor: " + e.getMessage());
            return ResponseEntity.status(500).body(ApiResponse.error("Error interno del servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR', 'INSPECTOR')")
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
                sessionInfo.put("roles", usuario.getRol().stream().map(rol -> rol.getCodigo()).toList());
                sessionInfo.put("isAdmin", sessionService.isAdmin());
                sessionInfo.put("isSupervisor", sessionService.isSupervisor());
                sessionInfo.put("isInspector", sessionService.isInspector());
                
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




}
