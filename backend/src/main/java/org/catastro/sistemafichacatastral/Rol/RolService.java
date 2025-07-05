package org.catastro.sistemafichacatastral.Rol;

import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RolService {
    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    /* FUNCIONES GET */
    public List<RolEntity> findAll() {
        return (List<RolEntity>) rolRepository.findAll();
    }

    public Optional<RolEntity> findById(Long id) {
        return rolRepository.findById(id);
    }

    public Optional<RolEntity> findByCodigo(String codigo) {
        return rolRepository.findByCodigo(codigo);
    }

    public RolEntity findByCodigoOrThrow(String codigo) {
        return rolRepository.findByCodigo(codigo)
                .orElseThrow(() -> new ResourceNotFoundException("Rol", "codigo", codigo));
    }

    /* FUNCIONES POST */

    public RolEntity create(String rolName, String rolCode) {
        RolEntity rol = new RolEntity();
        rol.setRol(rolName);
        rol.setCodigo(rolCode);
        return rolRepository.save(rol);
    }

    /* FUNCIONES PUT O PATCH */

    public RolEntity update(String rolName) {
        RolEntity rol = new RolEntity();
        rol.setRol(rolName);
        return rolRepository.save(rol);
    }




}
