package com.example.siscat.service;

import com.example.siscat.dto.ConfigParameterDto;
import com.example.siscat.exception.ResourceNotFoundException;
import com.example.siscat.model.ConfigParameter;
import com.example.siscat.repository.ConfigParameterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConfigParameterService {

    private final ConfigParameterRepository repository;

    public ConfigParameterService(ConfigParameterRepository repository) {
        this.repository = repository;
    }

    public List<ConfigParameterDto> findAll() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public ConfigParameterDto findByKey(String key) {
        ConfigParameter param = repository.findByKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Config not found"));
        return toDto(param);
    }

    public ConfigParameterDto save(ConfigParameterDto dto) {
        ConfigParameter param = repository.findByKey(dto.getKey()).orElse(new ConfigParameter());
        param.setKey(dto.getKey());
        param.setValue(dto.getValue());
        return toDto(repository.save(param));
    }

    public void delete(String key) {
        ConfigParameter param = repository.findByKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Config not found"));
        repository.delete(param);
    }

    private ConfigParameterDto toDto(ConfigParameter param) {
        ConfigParameterDto dto = new ConfigParameterDto();
        dto.setId(param.getId());
        dto.setKey(param.getKey());
        dto.setValue(param.getValue());
        return dto;
    }
}
