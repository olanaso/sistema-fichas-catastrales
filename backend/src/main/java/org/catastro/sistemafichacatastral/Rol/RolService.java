package org.catastro.sistemafichacatastral.Rol;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {
    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    /* FUNCIONES GET */
    public List<RolEntity> findAll() {
        return (List<RolEntity>) rolRepository.findAll();
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
