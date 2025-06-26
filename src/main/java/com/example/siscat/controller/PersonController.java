package com.example.siscat.controller;

import com.example.siscat.dto.PersonDto;
import com.example.siscat.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
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
}
