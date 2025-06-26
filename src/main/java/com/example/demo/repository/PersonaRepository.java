package com.example.demo.repository;

import com.example.demo.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio Spring Data JPA para la entidad Persona.
 */
public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
