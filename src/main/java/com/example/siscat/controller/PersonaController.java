package com.example.siscat.controller;

import com.example.siscat.model.Persona;
import com.example.siscat.service.PersonaService;
import com.example.siscat.session.UserSession;

import java.util.HashMap;
import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que expone operaciones CRUD para Persona.
 */
@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService service;
    private final UserSession userSession;

    public PersonaController(PersonaService service, UserSession userSession) {
        this.service = service;
        this.userSession = userSession;
    }

    /**
     * Obtiene todas las personas.
     */
    @GetMapping
    public List<Persona> all() {
        return service.findAll();
    }

    /**
     * Obtiene una persona por id.
     */
    @GetMapping("/{id}")
    public Persona get(@PathVariable Long id) {
        return service.findById(id);
    }

    /**
     * Crea una nueva persona.
     */
    @PostMapping
    public Persona create(@Valid @RequestBody Persona persona) {
        return service.create(persona);
    }

    /**
     * Actualiza una persona existente.
     */
    @PutMapping("/{id}")
    public Persona update(@PathVariable Long id, @Valid @RequestBody Persona persona) {
        return service.update(id, persona);
    }

    /**
     * Elimina una persona.
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    /**
     * Ejemplo de uso de la session de usuario.
     */
    @GetMapping("/session-info")
    public Map<String, Object> sessionInfo() {
        Map<String, Object> data = new HashMap<>();
        data.put("user", userSession.getUser());
        data.put("roles", userSession.getRoles());
        data.put("config", userSession.getConfig());
        return data;
    }
}
