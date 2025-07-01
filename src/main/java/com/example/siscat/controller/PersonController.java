package com.example.siscat.controller;

import com.example.siscat.dto.PersonDto;
import com.example.siscat.service.PersonService;
import com.example.siscat.session.UserSession;

import java.util.HashMap;
import java.util.Map;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {

    private final PersonService personService;
    private final UserSession userSession;

    public PersonController(PersonService personService, UserSession userSession) {
        this.personService = personService;
        this.userSession = userSession;
    }

    @GetMapping
    public List<PersonDto> all() {
        return personService.findAll();
    }

    @GetMapping("/{id}")
    public PersonDto get(@PathVariable Long id) {
        return personService.findById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public PersonDto create(@Valid @RequestBody PersonDto dto) {
        return personService.create(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public PersonDto update(@PathVariable Long id, @Valid @RequestBody PersonDto dto) {
        return personService.update(id, dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        personService.delete(id);
    }

    /**
     * Ejemplo de acceso a la session del usuario usando {@link UserSession}.
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
