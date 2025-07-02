package org.catastro.sistemafichacatastral.controller;

import org.catastro.sistemafichacatastral.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<String>> publicEndpoint() {
        return ResponseEntity.ok(ApiResponse.success("Endpoint público funcionando correctamente"));
    }

    @GetMapping("/data")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTestData() {
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Datos de prueba");
        data.put("timestamp", System.currentTimeMillis());
        data.put("status", "success");
        
        return ResponseEntity.ok(ApiResponse.success("Datos obtenidos exitosamente", data));
    }

    @PostMapping("/echo")
    public ResponseEntity<ApiResponse<Object>> echoData(@RequestBody Object requestData) {
        return ResponseEntity.ok(ApiResponse.success("Datos recibidos correctamente", requestData));
    }

    @GetMapping("/error-test")
    public ResponseEntity<ApiResponse<String>> testError() {
        throw new RuntimeException("Este es un error de prueba");
    }
} 