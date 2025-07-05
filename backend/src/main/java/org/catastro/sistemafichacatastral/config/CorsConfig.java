package org.catastro.sistemafichacatastral.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Opción 1: Para desarrollo - permitir todos los orígenes sin credenciales
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(false); // Cambiado a false para permitir todos los orígenes
        configuration.setMaxAge(3600L);
        
        // Opción 2: Para producción - orígenes específicos con credenciales
        // Descomenta las siguientes líneas y comenta las anteriores si necesitas credenciales
        /*
        List<String> allowedOrigins = Arrays.asList(
            "http://localhost:3000",     // React default
            "http://localhost:4200",     // Angular default
            "http://localhost:8080",     // Vue default
            "http://localhost:5173",     // Vite default
            "http://127.0.0.1:3000",
            "http://127.0.0.1:4200",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:5173",
            "http://localhost:3001",     // Otros puertos comunes
            "http://localhost:3002",
            "http://localhost:4000",
            "http://localhost:5000"
        );
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowCredentials(true);
        */
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
} 