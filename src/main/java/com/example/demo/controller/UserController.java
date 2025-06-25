package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User create(@RequestParam String username, @RequestParam String password, @RequestParam List<String> roles) {
        return userService.createUser(username, password, roles);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> all() {
        return userService.findAll();
    }
}
