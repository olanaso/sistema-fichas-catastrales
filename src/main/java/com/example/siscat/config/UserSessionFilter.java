package com.example.siscat.config;

import com.example.siscat.dto.ConfigParameterDto;
import com.example.siscat.model.Role;
import com.example.siscat.model.User;
import com.example.siscat.repository.UserRepository;
import com.example.siscat.service.ConfigParameterService;
import com.example.siscat.session.UserSession;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Initializes {@link UserSession} for each request after authentication.
 */
@Component
public class UserSessionFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final ConfigParameterService configService;
    private final UserSession userSession;

    public UserSessionFilter(UserRepository userRepository,
                             ConfigParameterService configService,
                             UserSession userSession) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.userSession = userSession;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof UserDetails principal) {
            String username = principal.getUsername();
            User user = userRepository.findByUsername(username).orElse(null);
            userSession.setUser(user);
            if (user != null) {
                List<String> roles = user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toList());
                userSession.setRoles(roles);
            }
            Map<String, String> config = configService.findAll().stream()
                    .collect(Collectors.toMap(ConfigParameterDto::getKey, ConfigParameterDto::getValue));
            userSession.setConfig(config);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth/login");
    }
}
