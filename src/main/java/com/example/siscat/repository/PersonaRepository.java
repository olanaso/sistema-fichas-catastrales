package com.example.siscat.repository;

import com.example.siscat.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio Spring Data JPA para la entidad Persona.
 */
public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
