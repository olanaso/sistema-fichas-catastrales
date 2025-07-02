package org.catastro.sistemafichacatastral.Usuario;

import org.catastro.sistemafichacatastral.Rol.RolEntity;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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
        UsuarioEntity usuarioEntity = new UsuarioEntity();
        usuarioEntity.setNombres(usuarioRegisterDto.getNombres());
        usuarioEntity.setApellidos(usuarioRegisterDto.getApellidos());
        usuarioEntity.setDni(usuarioRegisterDto.getDni());
        usuarioEntity.setEmail(usuarioRegisterDto.getEmail());
        usuarioEntity.setEdad(usuarioRegisterDto.getEdad());
        usuarioEntity.setPassword(passwordEncoder.encode(usuarioRegisterDto.getPassword()));

        //buscar usuario por dni o correo
        if(usuarioRepository.findByEmail(usuarioRegisterDto.getEmail()).isPresent()){
            throw new RuntimeException("El usuario con el correo ya existe");
        }
        try {
            return usuarioRepository.save(usuarioEntity);
        }catch (Exception e){
            throw new RuntimeException(e);
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
