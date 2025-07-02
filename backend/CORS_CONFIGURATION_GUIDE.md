# Guía de Configuración CORS - Sistema Ficha Catastral

## Problema Solucionado: Error de CORS

El error que estabas viendo:
```
When allowCredentials is true, allowedOrigins cannot contain the special value "*"
```

Se debía a una configuración CORS incorrecta. He solucionado esto con dos opciones:

## Opción 1: Configuración Simple (Recomendada para desarrollo)

### Archivo: `CorsConfig.java`
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Lista de orígenes permitidos
        List<String> allowedOrigins = Arrays.asList(
            "http://localhost:3000",     // React default
            "http://localhost:4200",     // Angular default
            "http://localhost:8080",     // Vue default
            "http://localhost:5173",     // Vite default
            "http://127.0.0.1:3000",
            "http://127.0.0.1:4200",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:5173"
        );
        
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Ventajas:
- ✅ Permite `allowCredentials: true`
- ✅ Funciona con cookies y headers de autenticación
- ✅ Configuración explícita y segura

### Desventajas:
- ❌ Necesitas agregar manualmente cada dominio
- ❌ No permite todos los orígenes automáticamente

## Opción 2: Configuración Permisiva (Solo para desarrollo)

Si prefieres permitir todos los orígenes, puedes usar esta configuración:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(false); // Debe ser false con "*"
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### Ventajas:
- ✅ Permite todos los orígenes automáticamente
- ✅ Configuración simple

### Desventajas:
- ❌ No permite `allowCredentials: true`
- ❌ No funciona con cookies
- ❌ Menos seguro para producción

## Configuración Actual Implementada

He implementado la **Opción 1** porque:

1. **Es más segura**: Solo permite orígenes específicos
2. **Permite credentials**: Necesario para JWT en cookies
3. **Funciona con frontend modernos**: Incluye los puertos más comunes

## Cómo Agregar Nuevos Orígenes

Si tu frontend corre en un puerto diferente, agrega la URL a la lista en `CorsConfig.java`:

```java
List<String> allowedOrigins = Arrays.asList(
    "http://localhost:3000",     // Tu puerto actual
    "http://localhost:4200",     // Agregar si usas Angular
    "http://localhost:8080",     // Agregar si usas Vue
    "http://localhost:5173",     // Agregar si usas Vite
    "http://tu-dominio.com",     // Agregar tu dominio de producción
    "https://tu-dominio.com"     // Agregar versión HTTPS
);
```

## Configuración para Producción

Para producción, deberías:

1. **Especificar solo los dominios reales**:
```java
List<String> allowedOrigins = Arrays.asList(
    "https://tu-app.com",
    "https://www.tu-app.com"
);
```

2. **Usar HTTPS** en todos los orígenes
3. **Limitar los métodos HTTP** si es necesario
4. **Configurar headers específicos** en lugar de "*"

## Verificación

Para verificar que CORS funciona correctamente:

1. **Ejecuta la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

2. **Prueba desde el navegador**:
   ```javascript
   fetch('http://localhost:8081/api/test/public')
     .then(response => response.json())
     .then(data => console.log(data));
   ```

3. **Verifica en las herramientas de desarrollador**:
   - No deberías ver errores CORS en la consola
   - Las peticiones deberían funcionar correctamente

## Troubleshooting

### Si sigues viendo errores CORS:

1. **Verifica que el puerto de tu frontend esté en la lista**
2. **Asegúrate de que uses `http://` o `https://` correctamente**
3. **Reinicia la aplicación** después de cambiar la configuración
4. **Limpia la caché del navegador**

### Si necesitas configuración más permisiva temporalmente:

Cambia a la Opción 2 durante desarrollo, pero recuerda volver a la Opción 1 para producción.

---

**¡El error de CORS debería estar completamente solucionado!** 