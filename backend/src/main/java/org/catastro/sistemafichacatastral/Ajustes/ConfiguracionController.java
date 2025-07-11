package org.catastro.sistemafichacatastral.Ajustes;

import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionEmpresaDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionCorreoDto;
import org.catastro.sistemafichacatastral.auth.DTO.ConfiguracionSistemasDto;
import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import java.nio.file.Path;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @Autowired
    private FileStorageService fileStorageService;

    /**
     * Obtiene la configuración del sistema
     */
    @GetMapping
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracion() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración obtenida exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración: " + e.getMessage()));
        }
    }

    /**
     * Actualiza la configuración del sistema (JSON)
     */
    @PutMapping
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracion(@Valid @RequestBody ConfiguracionDto configuracionDto) {
        try {
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracion(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";

            return ResponseEntity.ok(ApiResponse.success("Configuración " + accion + " exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración: " + e.getMessage()));
        }
    }

    /**
     * Actualiza la configuración del sistema con archivo multipart
     */
    @PutMapping("/multipart")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracionMultipart(
            // Campos obligatorios
            @RequestParam("nombreSistema") String nombreSistema,
            @RequestParam("nombreCorreo") String nombreCorreo,
            @RequestParam("conexionSici1") String conexionSici1,
            @RequestParam("conexionSici2") String conexionSici2,
            @RequestParam("clienteUrl") String clienteUrl,
            
            // Campos opcionales existentes
            @RequestParam(value = "logo", required = false) String logo,
            @RequestParam(value = "logoFile", required = false) MultipartFile logoFile,
            
            // Nuevos campos - Datos de la empresa (opcionales)
            @RequestParam(value = "ruc", required = false) String ruc,
            @RequestParam(value = "razonSocial", required = false) String razonSocial,
            @RequestParam(value = "direccion", required = false) String direccion,
            @RequestParam(value = "nombreComercial", required = false) String nombreComercial,
            @RequestParam(value = "pais", required = false) String pais,
            @RequestParam(value = "departamento", required = false) String departamento,
            @RequestParam(value = "provincia", required = false) String provincia,
            @RequestParam(value = "distrito", required = false) String distrito,
            
            // Nuevos campos - Configuración de correo (opcionales)
            @RequestParam(value = "correoSoporte", required = false) String correoSoporte,
            @RequestParam(value = "hostCorreo", required = false) String hostCorreo,
            @RequestParam(value = "passwordCorreo", required = false) String passwordCorreo,
            @RequestParam(value = "puertoCorreo", required = false) Integer puertoCorreo,
            @RequestParam(value = "usuarioCorreo", required = false) String usuarioCorreo,
            
            // Nuevos campos - APIs externas (opcionales)
            @RequestParam(value = "apiReniecRuc", required = false) String apiReniecRuc,
            
            // Nuevos campos - Configuración de base de datos PostgreSQL (opcionales)
            @RequestParam(value = "hostDb", required = false) String hostDb,
            @RequestParam(value = "usuarioDb", required = false) String usuarioDb,
            @RequestParam(value = "passwordDb", required = false) String passwordDb,
            @RequestParam(value = "baseDatos", required = false) String baseDatos) {
        
        try {
            // Crear DTO manualmente
            ConfiguracionDto configuracionDto = new ConfiguracionDto();
            
            // Campos obligatorios
            configuracionDto.setNombreSistema(nombreSistema);
            configuracionDto.setNombreCorreo(nombreCorreo);
            configuracionDto.setConexionSici1(conexionSici1);
            configuracionDto.setConexionSici2(conexionSici2);
            configuracionDto.setClienteUrl(clienteUrl);
            
            // Campos opcionales existentes
            configuracionDto.setLogo(logo);
            configuracionDto.setLogoFile(logoFile);
            
            // Nuevos campos - Datos de la empresa
            configuracionDto.setRuc(ruc);
            configuracionDto.setRazonSocial(razonSocial);
            configuracionDto.setDireccion(direccion);
            configuracionDto.setNombreComercial(nombreComercial);
            configuracionDto.setPais(pais);
            configuracionDto.setDepartamento(departamento);
            configuracionDto.setProvincia(provincia);
            configuracionDto.setDistrito(distrito);
            
            // Nuevos campos - Configuración de correo
            configuracionDto.setCorreoSoporte(correoSoporte);
            configuracionDto.setHostCorreo(hostCorreo);
            configuracionDto.setPasswordCorreo(passwordCorreo);
            configuracionDto.setPuertoCorreo(puertoCorreo);
            configuracionDto.setUsuarioCorreo(usuarioCorreo);
            
            // Nuevos campos - APIs externas
            configuracionDto.setApiReniecRuc(apiReniecRuc);
            
            // Nuevos campos - Configuración de base de datos PostgreSQL
            configuracionDto.setHostDb(hostDb);
            configuracionDto.setUsuarioDb(usuarioDb);
            configuracionDto.setPasswordDb(passwordDb);
            configuracionDto.setBaseDatos(baseDatos);
            
            // Validar campos obligatorios
            if (nombreSistema == null || nombreSistema.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El nombre del sistema es obligatorio"));
            }
            if (nombreCorreo == null || nombreCorreo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("El nombre del correo es obligatorio"));
            }
            if (conexionSici1 == null || conexionSici1.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La conexión SICI1 es obligatoria"));
            }
            if (conexionSici2 == null || conexionSici2.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La conexión SICI2 es obligatoria"));
            }
            if (clienteUrl == null || clienteUrl.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("La URL del cliente es obligatoria"));
            }
            
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracion(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";
            
            return ResponseEntity.ok(ApiResponse.success("Configuración " + accion + " exitosamente", configuracion));
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(ApiResponse.error("Error de validación: " + e.getMessage()));
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración: " + e.getMessage()));
        }
    }

    /**
     * Obtiene la configuración pública (sin restricciones de seguridad)
     * Para uso en el frontend público
     */
    @GetMapping("/public")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> getConfiguracionPublica() {
        try {
            ConfiguracionEntity configuracion = configuracionService.getConfiguracion();
            return ResponseEntity.ok(ApiResponse.success("Configuración pública obtenida exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al obtener configuración pública: " + e.getMessage()));
        }
    }

    /**
     * Sirve archivos de logo
     */
    @GetMapping("/logo/{filename:.+}")
    public ResponseEntity<Resource> serveLogo(@PathVariable String filename) {
        try {
            // Construir la ruta completa del archivo
            String logoPath = "/logos/" + filename;
            Path filePath = fileStorageService.getFilePath(logoPath);
            
            if (filePath != null && fileStorageService.fileExists(logoPath)) {
                Resource resource = new org.springframework.core.io.FileSystemResource(filePath.toFile());
                return ResponseEntity.ok()
                    .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                    .header("Cache-Control", "public, max-age=31536000") // Cache por 1 año
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Sirve archivos de logo usando la ruta completa almacenada en BD
     */
    @GetMapping("/logo-file")
    public ResponseEntity<Resource> serveLogoByPath(@RequestParam("path") String logoPath) {
        try {
            // Validar que la ruta comience con /logos/
            if (!logoPath.startsWith("/logos/")) {
                return ResponseEntity.badRequest().build();
            }
            
            Path filePath = fileStorageService.getFilePath(logoPath);
            
            if (filePath != null && fileStorageService.fileExists(logoPath)) {
                String filename = logoPath.substring(logoPath.lastIndexOf("/") + 1);
                Resource resource = new org.springframework.core.io.FileSystemResource(filePath.toFile());
                return ResponseEntity.ok()
                    .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                    .header("Cache-Control", "public, max-age=31536000") // Cache por 1 año
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ==================== ENDPOINTS PARA ACTUALIZACIÓN POR BLOQUES ====================

    /**
     * Actualiza la configuración de la empresa
     * Endpoint: PUT /configuracion/empresa
     */
    @PutMapping("/empresa")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracionEmpresa(@Valid @RequestBody ConfiguracionEmpresaDto configuracionDto) {
        try {
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracionEmpresa(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";
            
            return ResponseEntity.ok(ApiResponse.success("Configuración de empresa " + accion + " exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración de empresa: " + e.getMessage()));
        }
    }

    /**
     * Actualiza la configuración de correo
     * Endpoint: PUT /configuracion/correo
     */
    @PutMapping("/correo")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracionCorreo(@Valid @RequestBody ConfiguracionCorreoDto configuracionDto) {
        try {
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracionCorreo(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";
            
            return ResponseEntity.ok(ApiResponse.success("Configuración de correo " + accion + " exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración de correo: " + e.getMessage()));
        }
    }

    /**
     * Actualiza la configuración de sistemas externos
     * Endpoint: PUT /configuracion/sistemas
     */
    @PutMapping("/sistemas")
    public ResponseEntity<ApiResponse<ConfiguracionEntity>> updateConfiguracionSistemas(@Valid @RequestBody ConfiguracionSistemasDto configuracionDto) {
        try {
            ConfiguracionEntity configuracion = configuracionService.updateConfiguracionSistemas(configuracionDto);
            
            String accion = configuracionService.existeConfiguracion() ? "actualizada" : "creada";
            
            return ResponseEntity.ok(ApiResponse.success("Configuración de sistemas " + accion + " exitosamente", configuracion));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error al actualizar configuración de sistemas: " + e.getMessage()));
        }
    }
} 