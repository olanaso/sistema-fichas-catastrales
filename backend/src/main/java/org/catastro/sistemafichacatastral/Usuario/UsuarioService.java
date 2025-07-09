package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.Rol.RolEntity;
import org.catastro.sistemafichacatastral.Rol.RolService;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeMyPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioUpdateDto;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolService rolService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, RolService rolService) {
        this.usuarioRepository = usuarioRepository;
        this.rolService = rolService;
    }

    /* FUNCIONES  GET */
    public List<UsuarioEntity> findAll(){
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioEntity> findById(int id) {
        return usuarioRepository.findById(id);
    }

    public Optional<UsuarioEntity> findByDNI(String dni){
        return usuarioRepository.findByDni(dni);
    }

    public UsuarioEntity findByDNIOrThrow(String dni){
        return usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "dni", dni));
    }

    public Optional<UsuarioEntity> findByEmail(String email){
        return usuarioRepository.findByEmail(email);
    }

    public UsuarioEntity findByEmailOrThrow(String email){
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "email", email));
    }

    public long count() {
        return usuarioRepository.count();
    }

    // Métodos de filtrado
    public List<UsuarioEntity> findByRolAndNombre(Long rolId, String nombre) {
        if (rolId != null) {
            RolEntity rol = rolService.findByIdOrThrow(rolId);
            if (nombre != null && !nombre.trim().isEmpty()) {
                return usuarioRepository.findByRolAndNombre(rol, nombre.trim());
            } else {
                return usuarioRepository.findByRol(rol);
            }
        } else if (nombre != null && !nombre.trim().isEmpty()) {
            return usuarioRepository.findByNombre(nombre.trim());
        } else {
            return findAll();
        }
    }

    public List<UsuarioEntity> findByRol(Long rolId) {
        if (rolId != null) {
            RolEntity rol = rolService.findByIdOrThrow(rolId);
            return usuarioRepository.findByRol(rol);
        }
        return findAll();
    }

    public List<UsuarioEntity> findByNombre(String nombre) {
        if (nombre != null && !nombre.trim().isEmpty()) {
            return usuarioRepository.findByNombre(nombre.trim());
        }
        return findAll();
    }

    /* FUNCIONES POST */
    public UsuarioEntity create(UsuarioRegisterDto usuarioRegisterDto){
        // Verificar si el usuario ya existe por email
        if(usuarioRepository.findByEmail(usuarioRegisterDto.getEmail()).isPresent()){
            throw new RuntimeException("El usuario con el correo ya existe");
        }
        
        // Verificar si el usuario ya existe por DNI
        if(usuarioRepository.findByDni(usuarioRegisterDto.getDni()).isPresent()){
            throw new RuntimeException("El usuario con el DNI ya existe");
        }

        UsuarioEntity usuarioEntity = new UsuarioEntity();
        usuarioEntity.setNombres(usuarioRegisterDto.getNombres());
        usuarioEntity.setApellidos(usuarioRegisterDto.getApellidos());
        usuarioEntity.setDni(usuarioRegisterDto.getDni());
        usuarioEntity.setEmail(usuarioRegisterDto.getEmail());
        usuarioEntity.setPassword(passwordEncoder.encode(usuarioRegisterDto.getPassword()));
        usuarioEntity.setActivo(true); // Por defecto activo

        // Asignar automáticamente el rol de administrador
        Set<RolEntity> roles = new HashSet<>();
        try {
            // Buscar el rol de administrador por código
            RolEntity rolAdmin = rolService.findByCodigoOrThrow("ADMIN");
            roles.add(rolAdmin);
        } catch (ResourceNotFoundException e) {
            // Si no existe el rol de administrador, crearlo
            RolEntity rolAdmin = rolService.create("Administrador", "ADMIN");
            roles.add(rolAdmin);
        }
        
        usuarioEntity.setRol(roles);

        try {
            return usuarioRepository.save(usuarioEntity);
        }catch (Exception e){
            throw new RuntimeException("Error al guardar el usuario: " + e.getMessage());
        }
    }

    public UsuarioEntity createWithSpecificRole(UsuarioRegisterDto usuarioRegisterDto) {
        // Verificar si el usuario ya existe por email
        if(usuarioRepository.findByEmail(usuarioRegisterDto.getEmail()).isPresent()){
            throw new RuntimeException("El usuario con el correo ya existe");
        }
        
        // Verificar si el usuario ya existe por DNI
        if(usuarioRepository.findByDni(usuarioRegisterDto.getDni()).isPresent()){
            throw new RuntimeException("El usuario con el DNI ya existe");
        }

        UsuarioEntity usuarioEntity = new UsuarioEntity();
        usuarioEntity.setNombres(usuarioRegisterDto.getNombres());
        usuarioEntity.setApellidos(usuarioRegisterDto.getApellidos());
        usuarioEntity.setDni(usuarioRegisterDto.getDni());
        usuarioEntity.setEmail(usuarioRegisterDto.getEmail());
        usuarioEntity.setPassword(passwordEncoder.encode(usuarioRegisterDto.getPassword()));
        usuarioEntity.setActivo(true); // Por defecto activo

        // Asignar el rol específico por ID
        Set<RolEntity> roles = new HashSet<>();
        try {
            RolEntity rol = rolService.findByIdOrThrow(usuarioRegisterDto.getIdRol().longValue());
            roles.add(rol);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException("El rol con ID '" + usuarioRegisterDto.getIdRol() + "' no existe");
        }
        
        usuarioEntity.setRol(roles);

        try {
            return usuarioRepository.save(usuarioEntity);
        }catch (Exception e){
            throw new RuntimeException("Error al guardar el usuario: " + e.getMessage());
        }
    }

    /* FUNCIONES PUT O PATCH */
    public UsuarioEntity update(int id, UsuarioEntity usuarioDetails) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        usuario.setNombres(usuarioDetails.getNombres());
        usuario.setApellidos(usuarioDetails.getApellidos());
        usuario.setDni(usuarioDetails.getDni());
        usuario.setEmail(usuarioDetails.getEmail());
        usuario.setActivo(usuarioDetails.isActivo());

        if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(usuarioDetails.getPassword()));
        }
        
        return usuarioRepository.save(usuario);
    }

    // Nuevo método para actualizar con DTO específico
    public UsuarioEntity updateWithDto(int id, UsuarioUpdateDto usuarioUpdateDto) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        // Verificar si el email ya existe en otro usuario
        if (!usuario.getEmail().equals(usuarioUpdateDto.getEmail()) && 
            usuarioRepository.findByEmail(usuarioUpdateDto.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está en uso por otro usuario");
        }
        
        // Verificar si el DNI ya existe en otro usuario
        if (!usuario.getDni().equals(usuarioUpdateDto.getDni()) && 
            usuarioRepository.findByDni(usuarioUpdateDto.getDni()).isPresent()) {
            throw new RuntimeException("El DNI ya está en uso por otro usuario");
        }
        
        // Actualizar datos básicos del usuario
        usuario.setNombres(usuarioUpdateDto.getNombres());
        usuario.setApellidos(usuarioUpdateDto.getApellidos());
        usuario.setDni(usuarioUpdateDto.getDni());
        usuario.setEmail(usuarioUpdateDto.getEmail());
        usuario.setActivo(usuarioUpdateDto.getActivo());
        
        // Actualizar el rol del usuario
        try {
            RolEntity nuevoRol = rolService.findByIdOrThrow(usuarioUpdateDto.getIdRol().longValue());
            Set<RolEntity> roles = new HashSet<>();
            roles.add(nuevoRol);
            usuario.setRol(roles);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException("El rol con ID '" + usuarioUpdateDto.getIdRol() + "' no existe");
        }
        
        return usuarioRepository.save(usuario);
    }

    // Método para cambiar contraseña
    public UsuarioEntity changePassword(int id, ChangeUserPasswordDto changePasswordDto) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        // Actualizar con la nueva contraseña
        usuario.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        
        return usuarioRepository.save(usuario);
    }

    // Método para cambiar contraseña del usuario logueado
    public UsuarioEntity changeMyPassword(UsuarioEntity currentUser, ChangeMyPasswordDto changePasswordDto) {
        // Verificar que la contraseña actual sea correcta
        //buscar usuario por id
        UsuarioEntity usuario = usuarioRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", currentUser.getId()));

        if (!passwordEncoder.matches(changePasswordDto.getCurrentPassword(), usuario.getPassword())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }
        
        // Verificar que la nueva contraseña sea diferente a la actual
        if (passwordEncoder.matches(changePasswordDto.getNewPassword(), currentUser.getPassword())) {
            throw new RuntimeException("La nueva contraseña debe ser diferente a la actual");
        }
        
        // Actualizar con la nueva contraseña
        currentUser.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        
        return usuarioRepository.save(currentUser);
    }

    // Método específico para reset de contraseña (desde AuthService)
    public UsuarioEntity resetPassword(int id, String newPassword) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        // Solo actualizar la contraseña
        usuario.setPassword(passwordEncoder.encode(newPassword));
        
        return usuarioRepository.save(usuario);
    }

    // Método para activar/desactivar usuario
    public UsuarioEntity toggleActivo(int id) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        usuario.setActivo(!usuario.isActivo());
        return usuarioRepository.save(usuario);
    }

    public UsuarioEntity activarUsuario(int id) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    public UsuarioEntity desactivarUsuario(int id) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        
        usuario.setActivo(false);
        return usuarioRepository.save(usuario);
    }

    /* FUNCIONES DELETE */
    public void deleteById(int id) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        usuarioRepository.delete(usuario);
    }
}
