package com.example.siscat.session;

import com.example.siscat.model.User;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.context.annotation.ScopedProxyMode;

import java.util.List;
import java.util.Map;

/**
 * Holds session data for the current authenticated user.
 */
@Component
@RequestScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession {
    private User user;
    private List<String> roles;
    private Map<String, String> config;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Map<String, String> getConfig() {
        return config;
    }

    public void setConfig(Map<String, String> config) {
        this.config = config;
    }
}
