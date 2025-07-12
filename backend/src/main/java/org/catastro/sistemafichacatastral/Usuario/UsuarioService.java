package org.catastro.sistemafichacatastral.Usuario;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.PersistenceException;
import org.catastro.sistemafichacatastral.dto.InspectorDTO;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import java.util.*;

@Service
@Transactional
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final EntityManager entityManager;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UsuarioService(UsuarioRepository usuarioRepository, EntityManager entityManager) {
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

    public UsuarioEntity findByUsuarioOrThrow(String usuario){
        return usuarioRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "usuario", usuario));
    }

    public long count() {
        return usuarioRepository.count();
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

    @Transactional
    public String upsertUsuarioJson(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.usp_upsert_usersystem(?::jsonb)");
            query.setParameter(1, json);
            return (String) query.getSingleResult();
        } catch (PersistenceException e) {
            throw new RuntimeException("Error al insertar o actualizar usuario: " + e.getMessage(), e);
        }
    }

}
