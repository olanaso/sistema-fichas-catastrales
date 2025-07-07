package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.audit.AuditService;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
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

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> getUsuarioByEmail(@PathVariable String email) {
        try {
            UsuarioEntity usuario = usuarioService.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));
            return ResponseEntity.ok(ApiResponse.success("Usuario encontrado", usuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener usuario: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<UsuarioEntity>> updateUsuario(@PathVariable int id, @RequestBody UsuarioEntity usuarioDetails) {
        try {
            UsuarioEntity updatedUsuario = usuarioService.update(id, usuarioDetails);
            return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", updatedUsuario));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar usuario: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteUsuario(@PathVariable int id) {
        try {
            usuarioService.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success("Usuario eliminado exitosamente"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al eliminar usuario: " + e.getMessage()));
        }
    }

    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    public ResponseEntity<ApiResponse<Long>> getUsuarioCount() {
        try {
            long count = usuarioService.count();
            return ResponseEntity.ok(ApiResponse.success("Conteo de usuarios obtenido", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al contar usuarios: " + e.getMessage()));
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
}
