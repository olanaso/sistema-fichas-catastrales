package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Persona;
import com.example.demo.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio que encapsula la logica de negocio para Persona.
 */
@Service
public class PersonaService {

    private final PersonaRepository repository;

    public PersonaService(PersonaRepository repository) {
        this.repository = repository;
    }

    /**
     * Obtiene todas las personas registradas.
     */
    public List<Persona> findAll() {
        return repository.findAll();
    }

    /**
     * Busca una persona por su identificador.
     */
    public Persona findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona not found"));
    }

    /**
     * Crea una nueva persona.
     */
    public Persona create(Persona persona) {
        return repository.save(persona);
    }

    /**
     * Actualiza los datos de una persona existente.
     */
    public Persona update(Long id, Persona datos) {
        Persona persona = findById(id);
        persona.setNombre(datos.getNombre());
        persona.setApellido(datos.getApellido());
        persona.setEdad(datos.getEdad());
        persona.setCorreo(datos.getCorreo());
        persona.setDni(datos.getDni());
        return repository.save(persona);
    }

    /**
     * Elimina una persona por su id.
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
