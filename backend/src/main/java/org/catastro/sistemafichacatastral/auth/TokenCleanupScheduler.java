package org.catastro.sistemafichacatastral.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TokenCleanupScheduler {

    @Autowired
    private AuthService authService;

    // Ejecutar cada día a las 2:00 AM
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            authService.cleanupExpiredTokens();
            System.out.println("Limpieza de tokens expirados completada");
        } catch (Exception e) {
            System.err.println("Error durante la limpieza de tokens: " + e.getMessage());
        }
    }
} 