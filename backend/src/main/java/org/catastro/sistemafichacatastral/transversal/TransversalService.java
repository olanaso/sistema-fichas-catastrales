package org.catastro.sistemafichacatastral.transversal;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeMyPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioRegisterDto;
import org.catastro.sistemafichacatastral.auth.DTO.UsuarioUpdateDto;
import org.catastro.sistemafichacatastral.dto.InspectorDTO;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TransversalService {
    private final UsuarioRepository usuarioRepository;
    private final EntityManager entityManager;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PasswordEncoder passwordEncoder;


    public TransversalService(UsuarioRepository usuarioRepository, EntityManager entityManager) {
        this.usuarioRepository = usuarioRepository;
        this.entityManager = entityManager;
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


    @Transactional
    public UsuarioEntity upsertUsuarioJson(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT insertar_o_actualizar_usuario(?::jsonb)");
            query.setParameter(1, json);

            Number result = (Number) query.getSingleResult();
            int usuarioId = result.intValue();

            return usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("No se encontró el usuario después de la operación."));
        } catch (Exception e) {
            throw new RuntimeException("Error al insertar/actualizar usuario: " + e.getMessage());
        }
    }

    public List<InspectorDTO> obtenerInspectores(int limit, int offset) {
        try {
            Query query = entityManager.createNativeQuery(
                    "SELECT fichacatastral.obtener_inspectores_json(:limit, :offset)"
            );
            query.setParameter("limit", limit);
            query.setParameter("offset", offset);

            Object result = query.getSingleResult();

            if (result != null) {
                String json = result.toString();
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(json, new TypeReference<List<InspectorDTO>>() {});
            }

            return Collections.emptyList();
        } catch (PersistenceException e) {
            throw new RuntimeException("Error al obtener inspectores: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error al parsear inspectores: " + e.getMessage(), e);
        }
    }

}
