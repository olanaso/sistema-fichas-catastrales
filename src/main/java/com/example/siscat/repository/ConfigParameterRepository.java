package com.example.siscat.repository;

import com.example.siscat.model.ConfigParameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfigParameterRepository extends JpaRepository<ConfigParameter, Long> {
    Optional<ConfigParameter> findByKey(String key);
}
