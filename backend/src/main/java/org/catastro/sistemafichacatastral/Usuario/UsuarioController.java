package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UsuarioEntity>>> getAllUsuarios() {
        try {
            List<UsuarioEntity> usuarios = usuarioService.findAll();
            return ResponseEntity.ok(ApiResponse.success("Usuarios obtenidos exitosamente", usuarios));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener usuarios: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Long>> getUsuarioCount() {
        try {
            long count = usuarioService.count();
            return ResponseEntity.ok(ApiResponse.success("Conteo de usuarios obtenido", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al contar usuarios: " + e.getMessage()));
        }
    }
}
