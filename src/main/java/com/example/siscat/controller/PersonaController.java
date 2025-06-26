package com.example.siscat.controller;

import com.example.siscat.model.Persona;
import com.example.siscat.service.PersonaService;
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

    public PersonaController(PersonaService service) {
        this.service = service;
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
}
