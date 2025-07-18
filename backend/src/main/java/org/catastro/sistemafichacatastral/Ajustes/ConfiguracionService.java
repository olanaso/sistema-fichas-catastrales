package org.catastro.sistemafichacatastral.Ajustes;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionEmpresaDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionCorreoDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionSistemasDto;
import org.catastro.sistemafichacatastral.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class ConfiguracionService {
    
    private final ConfiguracionRepository configuracionRepository;
    private final FileStorageService fileStorageService;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public ConfiguracionService(ConfiguracionRepository configuracionRepository, FileStorageService fileStorageService) {
        this.configuracionRepository = configuracionRepository;
        this.fileStorageService = fileStorageService;
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
     * Crea una configuración por defecto
     */
    private ConfiguracionEntity crearConfiguracionPorDefecto() {
        ConfiguracionEntity configuracion = new ConfiguracionEntity();
        
        // Campos obligatorios
        configuracion.setNombreSistema("Sistema de Fichas Catastrales");
        configuracion.setNombreCorreo("Sistema Catastral");
        configuracion.setConexionSici1("http://localhost:8080/sici1");
        configuracion.setConexionSici2("http://localhost:8080/sici2");
        configuracion.setClienteUrl("http://localhost:3000");
        configuracion.setLogo("/assets/images/logo-default.png");
        
        // Datos de la empresa (opcionales)
        configuracion.setRuc("20123456789");
        configuracion.setRazonSocial("MUNICIPALIDAD PROVINCIAL DE LIMA");
        configuracion.setDireccion("Av. Arequipa 123, Lima");
        configuracion.setNombreComercial("MPL");
        configuracion.setPais("Perú");
        configuracion.setDepartamento("Lima");
        configuracion.setProvincia("Lima");
        configuracion.setDistrito("Lima");
        
        // Configuración de correo (opcionales)
        configuracion.setCorreoSoporte("soporte@municipalidad.gob.pe");
        configuracion.setHostCorreo("smtp.gmail.com");
        configuracion.setPasswordCorreo("");
        configuracion.setPuertoCorreo(587);
        configuracion.setUsuarioCorreo("sistema@municipalidad.gob.pe");
        
        // APIs externas (opcionales)
        configuracion.setApiReniecRuc("https://api.reniec.gob.pe/v1");
        
        // Configuración de base de datos PostgreSQL (opcionales)
        configuracion.setHostDb("localhost");
        configuracion.setUsuarioDb("postgres");
        configuracion.setPasswordDb("");
        configuracion.setBaseDatos("sistema_fichas_catastrales");
        
        return configuracionRepository.save(configuracion);
    }

    @Transactional
    public String actualizarConfiguracionJson(String json) {
        try {
            Query query = entityManager.createNativeQuery("SELECT fichacatastral.actualizar_configuracion(?::jsonb)");
            query.setParameter(1, json);

            return (String) query.getSingleResult();
        } catch (PersistenceException e) {
            Throwable cause = e.getCause();
            if (cause != null && cause.getMessage() != null && cause.getMessage().contains("El campo id es requerido")) {
                throw new RuntimeException("El campo ID es obligatorio.");
            }
            throw new RuntimeException("Error al actualizar configuración: " + e.getMessage());
        }
    }

} 