package org.catastro.sistemafichacatastral.Rol;

import org.catastro.sistemafichacatastral.Rol.DTO.RolDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public RolEntity addRol(@RequestBody RolDto rolDto){
        return rolService.create(rolDto.getRol(), rolDto.getCodigo());
    }

    @GetMapping
    public List<RolEntity> findAllRol(){
        return rolService.findAll();
    }

    @PatchMapping
    public RolEntity updateRol(@RequestBody RolDto rolDto){
        return rolService.update(rolDto.getRol());
    }


}
