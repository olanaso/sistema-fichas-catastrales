package org.catastro.sistemafichacatastral.Ajustes;

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
     * Actualiza la configuración del sistema
     * Si no existe, la crea
     */
    public ConfiguracionEntity updateConfiguracion(ConfiguracionDto configuracionDto) throws IOException {
        Optional<ConfiguracionEntity> configuracionExistente = configuracionRepository.findFirstByOrderByIdAsc();
        
        ConfiguracionEntity configuracion;
        String logoAnterior = null;
        
        if (configuracionExistente.isPresent()) {
            // Actualizar configuración existente
            configuracion = configuracionExistente.get();
            logoAnterior = configuracion.getLogo();
        } else {
            // Crear nueva configuración
            configuracion = new ConfiguracionEntity();
        }
        
        // Manejar archivo de logo si se proporciona
        MultipartFile logoFile = configuracionDto.getLogoFile();
        if (logoFile != null && !logoFile.isEmpty()) {
            // Guardar nuevo archivo
            String nuevoLogoPath = fileStorageService.saveLogoFile(logoFile);
            configuracion.setLogo(nuevoLogoPath);
            
            // Eliminar archivo anterior si existe y es diferente
            if (logoAnterior != null && !logoAnterior.equals(nuevoLogoPath)) {
                fileStorageService.deleteLogoFile(logoAnterior);
            }
        } else if (configuracionDto.getLogo() != null) {
            // Si no hay archivo pero sí hay URL, usar la URL
            configuracion.setLogo(configuracionDto.getLogo());
        }
        
        // Actualizar campos obligatorios
        configuracion.setNombreSistema(configuracionDto.getNombreSistema());
        configuracion.setNombreCorreo(configuracionDto.getNombreCorreo());
        configuracion.setConexionSici1(configuracionDto.getConexionSici1());
        configuracion.setConexionSici2(configuracionDto.getConexionSici2());
        configuracion.setClienteUrl(configuracionDto.getClienteUrl());
        
        // Actualizar campos opcionales - Datos de la empresa
        configuracion.setRuc(configuracionDto.getRuc());
        configuracion.setRazonSocial(configuracionDto.getRazonSocial());
        configuracion.setDireccion(configuracionDto.getDireccion());
        configuracion.setNombreComercial(configuracionDto.getNombreComercial());
        configuracion.setPais(configuracionDto.getPais());
        configuracion.setDepartamento(configuracionDto.getDepartamento());
        configuracion.setProvincia(configuracionDto.getProvincia());
        configuracion.setDistrito(configuracionDto.getDistrito());
        
        // Actualizar campos opcionales - Configuración de correo
        configuracion.setCorreoSoporte(configuracionDto.getCorreoSoporte());
        configuracion.setHostCorreo(configuracionDto.getHostCorreo());
        configuracion.setPasswordCorreo(configuracionDto.getPasswordCorreo());
        configuracion.setPuertoCorreo(configuracionDto.getPuertoCorreo());
        configuracion.setUsuarioCorreo(configuracionDto.getUsuarioCorreo());
        
        // Actualizar campos opcionales - APIs externas
        configuracion.setApiReniecRuc(configuracionDto.getApiReniecRuc());
        
        // Actualizar campos opcionales - Configuración de base de datos PostgreSQL
        configuracion.setHostDb(configuracionDto.getHostDb());
        configuracion.setUsuarioDb(configuracionDto.getUsuarioDb());
        configuracion.setPasswordDb(configuracionDto.getPasswordDb());
        configuracion.setBaseDatos(configuracionDto.getBaseDatos());
        
        return configuracionRepository.save(configuracion);
    }

    /**
     * Verifica si existe alguna configuración
     */
    public boolean existeConfiguracion() {
        return configuracionRepository.existsBy();
    }

    /**
     * Actualiza solo la configuración de la empresa
     */
    public ConfiguracionEntity updateConfiguracionEmpresa(ConfiguracionEmpresaDto configuracionDto) {
        Optional<ConfiguracionEntity> configuracionExistente = configuracionRepository.findFirstByOrderByIdAsc();
        
        ConfiguracionEntity configuracion;
        
        if (configuracionExistente.isPresent()) {
            configuracion = configuracionExistente.get();
        } else {
            configuracion = new ConfiguracionEntity();
        }
        
        // Actualizar solo los campos del bloque empresa
        configuracion.setNombreSistema(configuracionDto.getNombreSistema());
        configuracion.setNombreCorreo(configuracionDto.getNombreCorreo());
        configuracion.setClienteUrl(configuracionDto.getClienteUrl());
        configuracion.setRuc(configuracionDto.getRuc());
        configuracion.setRazonSocial(configuracionDto.getRazonSocial());
        configuracion.setDireccion(configuracionDto.getDireccion());
        configuracion.setPais(configuracionDto.getPais());
        configuracion.setDepartamento(configuracionDto.getDepartamento());
        configuracion.setProvincia(configuracionDto.getProvincia());
        configuracion.setDistrito(configuracionDto.getDistrito());
        configuracion.setCorreoSoporte(configuracionDto.getCorreoSoporte());
        
        return configuracionRepository.save(configuracion);
    }

    /**
     * Actualiza solo la configuración de correo
     */
    public ConfiguracionEntity updateConfiguracionCorreo(ConfiguracionCorreoDto configuracionDto) {
        Optional<ConfiguracionEntity> configuracionExistente = configuracionRepository.findFirstByOrderByIdAsc();
        
        ConfiguracionEntity configuracion;
        
        if (configuracionExistente.isPresent()) {
            configuracion = configuracionExistente.get();
        } else {
            configuracion = new ConfiguracionEntity();
        }
        
        // Actualizar solo los campos del bloque correo
        configuracion.setHostCorreo(configuracionDto.getHostCorreo());
        configuracion.setPasswordCorreo(configuracionDto.getPasswordCorreo());
        configuracion.setPuertoCorreo(configuracionDto.getPuertoCorreo());
        configuracion.setUsuarioCorreo(configuracionDto.getUsuarioCorreo());
        
        return configuracionRepository.save(configuracion);
    }

    /**
     * Actualiza solo la configuración de sistemas externos
     */
    public ConfiguracionEntity updateConfiguracionSistemas(ConfiguracionSistemasDto configuracionDto) {
        Optional<ConfiguracionEntity> configuracionExistente = configuracionRepository.findFirstByOrderByIdAsc();
        
        ConfiguracionEntity configuracion;
        
        if (configuracionExistente.isPresent()) {
            configuracion = configuracionExistente.get();
        } else {
            configuracion = new ConfiguracionEntity();
        }
        
        // Actualizar solo los campos del bloque sistemas
        configuracion.setApiReniecRuc(configuracionDto.getApiReniecRuc());
        configuracion.setHostDb(configuracionDto.getHostDb());
        configuracion.setUsuarioDb(configuracionDto.getUsuarioDb());
        configuracion.setPasswordDb(configuracionDto.getPasswordDb());
        configuracion.setBaseDatos(configuracionDto.getBaseDatos());
        configuracion.setConexionSici1(configuracionDto.getConexionSici1());
        configuracion.setConexionSici2(configuracionDto.getConexionSici2());
        
        return configuracionRepository.save(configuracion);
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
} 