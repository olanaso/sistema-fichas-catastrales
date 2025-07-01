package com.example.siscat.controller;

import com.example.siscat.dto.ConfigParameterDto;
import com.example.siscat.service.ConfigParameterService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/config")
public class ConfigParameterController {

    private final ConfigParameterService service;

    public ConfigParameterController(ConfigParameterService service) {
        this.service = service;
    }

    @GetMapping
    public List<ConfigParameterDto> all() {
        return service.findAll();
    }

    @GetMapping("/{key}")
    public ConfigParameterDto get(@PathVariable String key) {
        return service.findByKey(key);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ConfigParameterDto create(@Valid @RequestBody ConfigParameterDto dto) {
        return service.save(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{key}")
    public void delete(@PathVariable String key) {
        service.delete(key);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/logo")
    public ConfigParameterDto uploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
        Path uploadDir = Paths.get("uploads");
        Files.createDirectories(uploadDir);
        Path target = uploadDir.resolve(file.getOriginalFilename());
        file.transferTo(target);

        ConfigParameterDto dto = new ConfigParameterDto();
        dto.setKey("logo.path");
        dto.setValue(target.toString());
        return service.save(dto);
    }
}
