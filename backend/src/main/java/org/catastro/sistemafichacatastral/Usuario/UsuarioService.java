package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.Rol.RolEntity;
import org.catastro.sistemafichacatastral.Rol.RolService;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
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
    public Optional<UsuarioEntity> findByRol(RolEntity rol){
        return  usuarioRepository.findByRol(rol);
    }

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
        usuarioEntity.setEdad(usuarioRegisterDto.getEdad());
        usuarioEntity.setPassword(passwordEncoder.encode(usuarioRegisterDto.getPassword()));

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

    public UsuarioEntity createWithSpecificRole(UsuarioRegisterDto usuarioRegisterDto, String roleCode) {
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
        usuarioEntity.setEdad(usuarioRegisterDto.getEdad());
        usuarioEntity.setPassword(passwordEncoder.encode(usuarioRegisterDto.getPassword()));

        // Asignar el rol específico
        Set<RolEntity> roles = new HashSet<>();
        try {
            RolEntity rol = rolService.findByCodigoOrThrow(roleCode);
            roles.add(rol);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException("El rol con código '" + roleCode + "' no existe");
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
        usuario.setEdad(usuarioDetails.getEdad());
        
        if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(usuarioDetails.getPassword()));
        }
        
        return usuarioRepository.save(usuario);
    }

    /* FUNCIONES DELETE */
    public void deleteById(int id) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        usuarioRepository.delete(usuario);
    }
}
