package org.catastro.sistemafichacatastral.Ajustes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "configuracion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfiguracionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre_sistema", length = 100, nullable = false)
    private String nombreSistema;

    @Column(name = "nombre_correo", length = 100, nullable = false)
    private String nombreCorreo;

    @Column(name = "conexion_sici1", length = 255, nullable = false)
    private String conexionSici1;

    @Column(name = "conexion_sici2", length = 255, nullable = false)
    private String conexionSici2;

    @Column(name = "logo", length = 255)
    private String logo;

    @Column(name = "cliente_url", length = 255, nullable = false)
    private String clienteUrl;
} 