package org.catastro.sistemafichacatastral.Usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usersystema", schema = "fichacatastral")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioEntity implements UserDetails {

    @Id
    @Column(length = 20)
    private String codusu;

    @Column(length = 20)
    private String usuario;

    @Column(length = 30)
    private String apellidopa;

    @Column(length = 30)
    private String apellidoma;

    @Column(length = 30)
    private String nombre;

    @Column(length = 120)
    private String car;

    @Column(length = 8)
    private String dni;

    private Timestamp fechaingreso;

    @Column(length = 60)
    private String direccion;

    @Column(length = 10)
    private String ciudad;

    @Column(length = 30)
    private String email;

    @Column(length = 15)
    private String telefono;

    @JsonIgnore
    @Column(length = 15, name = "password")
    private String password;

    @Column(length = 60)
    private String nivel;

    @Column(length = 100)
    private String notas;

    @Column(length = 1)
    private String estacionactiva;

    @Column(length = 50)
    private String estaciondefault;

    @Column(length = 50)
    private String nropc;

    @Column(length = 3)
    private String codempdefault;

    @Column(length = 3)
    private String codsucdefault;

    @Column(nullable = false)
    private short estareg = 1;

    @Column(nullable = false, length = 20)
    private String creador;

    private Timestamp fechareg;

    @Column(length = 3)
    private String user_fondo;

    @Column(length = 3)
    private String user_avatar;

    @Column(length = 20)
    private String ipdefault;

    @Column(nullable = false)
    private short intranet = 1;

    @Column(length = 200)
    private String foto;

    @Column(length = 3)
    private String tipouser;

    @Column(nullable = false)
    private int accesototal = 0;

    @Column(length = 3)
    private String codinspector;

    @Column(length = 3)
    private String codsededefault;

    @Column( name = "activo")
    private boolean activo=true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Basado en accesototal: 1 = acceso total, 0 = acceso limitado
        if (accesototal == 1) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override public String getUsername() { return usuario; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return activo; }

}
