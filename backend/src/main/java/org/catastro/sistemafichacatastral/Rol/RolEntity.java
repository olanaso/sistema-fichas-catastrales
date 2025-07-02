package org.catastro.sistemafichacatastral.Rol;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "rol")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( length = 10, nullable = false, unique = true )
    private String codigo;

    @Column(  length = 100, nullable = false, unique = true )
    private String rol;

}
