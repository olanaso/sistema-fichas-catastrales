package org.catastro.sistemafichacatastral.auth.DTO;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String token;
    private String newPassword;
    private String confirmPassword;
} 