package org.catastro.sistemafichacatastral.Ajustes;

import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionDto;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ConfiguracionService {
    
    private final ConfiguracionRepository configuracionRepository;

    @Autowired
    public ConfiguracionService(ConfiguracionRepository configuracionRepository) {
        this.configuracionRepository = configuracionRepository;
    }

    /**
     * Obtiene la configuración del sistema
     * Si no existe, crea una configuración por defecto
     */
    public ConfiguracionEntity getConfiguracion() {
        Optional<ConfiguracionEntity> configuracion = configuracionRepository.findFirstByOrderByIdAsc();
        
        if (configuracion.isPresent()) {
            return configuracion.get();
        } else {
            // Crear configuración por defecto si no existe
            return crearConfiguracionPorDefecto();
        }
    }

    /**
     * Actualiza la configuración del sistema
     * Si no existe, la crea
     */
    public ConfiguracionEntity updateConfiguracion(ConfiguracionDto configuracionDto) {
        Optional<ConfiguracionEntity> configuracionExistente = configuracionRepository.findFirstByOrderByIdAsc();
        
        ConfiguracionEntity configuracion;
        
        if (configuracionExistente.isPresent()) {
            // Actualizar configuración existente
            configuracion = configuracionExistente.get();
        } else {
            // Crear nueva configuración
            configuracion = new ConfiguracionEntity();
        }
        
        // Actualizar campos
        configuracion.setNombreSistema(configuracionDto.getNombreSistema());
        configuracion.setNombreCorreo(configuracionDto.getNombreCorreo());
        configuracion.setConexionSici1(configuracionDto.getConexionSici1());
        configuracion.setConexionSici2(configuracionDto.getConexionSici2());
        configuracion.setLogo(configuracionDto.getLogo());
        configuracion.setClienteUrl(configuracionDto.getClienteUrl());
        
        return configuracionRepository.save(configuracion);
    }

    /**
     * Verifica si existe alguna configuración
     */
    public boolean existeConfiguracion() {
        return configuracionRepository.existsBy();
    }

    /**
     * Crea una configuración por defecto
     */
    private ConfiguracionEntity crearConfiguracionPorDefecto() {
        ConfiguracionEntity configuracion = new ConfiguracionEntity();
        configuracion.setNombreSistema("Sistema de Fichas Catastrales");
        configuracion.setNombreCorreo("Sistema Catastral");
        configuracion.setConexionSici1("http://localhost:8080/sici1");
        configuracion.setConexionSici2("http://localhost:8080/sici2");
        configuracion.setLogo("/assets/images/logo-default.png");
        configuracion.setClienteUrl("http://localhost:3000");
        
        return configuracionRepository.save(configuracion);
    }
} 