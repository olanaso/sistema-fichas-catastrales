package org.catastro.sistemafichacatastral.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.catastro.sistemafichacatastral.auth.DTO.ChangePasswordDto;
import org.catastro.sistemafichacatastral.auth.DTO.ChangeUserPasswordDto;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, Object> {

    @Override
    public void initialize(PasswordMatch constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        
        if (value instanceof ChangePasswordDto) {
            ChangePasswordDto dto = (ChangePasswordDto) value;
            return dto.getNewPassword() != null && 
                   dto.getConfirmPassword() != null && 
                   dto.getNewPassword().equals(dto.getConfirmPassword());
        }
        
        if (value instanceof ChangeUserPasswordDto) {
            ChangeUserPasswordDto dto = (ChangeUserPasswordDto) value;
            return dto.getNewPassword() != null && 
                   dto.getConfirmPassword() != null && 
                   dto.getNewPassword().equals(dto.getConfirmPassword());
        }
        
        return false;
    }
} 