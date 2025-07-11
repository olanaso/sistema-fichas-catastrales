package org.catastro.sistemafichacatastral.service;

import org.catastro.sistemafichacatastral.Usuario.UsuarioEntity;
import org.catastro.sistemafichacatastral.Usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Obtiene el usuario actualmente autenticado
     * @return UsuarioEntity del usuario en sesión
     */
    public UsuarioEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            !authentication.getName().equals("anonymousUser")) {
            return usuarioService.findByEmailOrThrow(authentication.getName());
        }
        return null;
    }

    /**
     * Obtiene el ID del usuario actualmente autenticado
     * @return ID del usuario en sesión
     */
    public Integer getCurrentUserId() {
        UsuarioEntity user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    /**
     * Obtiene el email del usuario actualmente autenticado
     * @return Email del usuario en sesión
     */
    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getName().equals("anonymousUser")) {
            return authentication.getName();
        }
        return null;
    }
} 