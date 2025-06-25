package com.example.demo.service;

import com.example.demo.dto.PersonDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository repository;

    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<PersonDto> findAll() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public PersonDto findById(Long id) {
        Person person = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));
        return toDto(person);
    }

    public PersonDto create(PersonDto dto) {
        Person person = toEntity(dto);
        return toDto(repository.save(person));
    }

    public PersonDto update(Long id, PersonDto dto) {
        Person person = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));
        person.setFirstName(dto.getFirstName());
        person.setLastName(dto.getLastName());
        person.setEmail(dto.getEmail());
        return toDto(repository.save(person));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private PersonDto toDto(Person person) {
        PersonDto dto = new PersonDto();
        dto.setId(person.getId());
        dto.setFirstName(person.getFirstName());
        dto.setLastName(person.getLastName());
        dto.setEmail(person.getEmail());
        return dto;
    }

    private Person toEntity(PersonDto dto) {
        Person person = new Person();
        person.setFirstName(dto.getFirstName());
        person.setLastName(dto.getLastName());
        person.setEmail(dto.getEmail());
        return person;
    }
}
