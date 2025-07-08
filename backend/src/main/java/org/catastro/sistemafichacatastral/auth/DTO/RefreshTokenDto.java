package org.catastro.sistemafichacatastral.auth.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenDto {
    
    @NotBlank(message = "El refresh token es obligatorio")
    private String refreshToken;
} 