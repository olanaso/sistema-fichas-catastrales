package org.catastro.sistemafichacatastral.Ajustes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "configuracion", schema = "auth")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfiguracionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Atributos existentes
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

    // Nuevos atributos - Datos de la empresa
    @Column(name = "ruc", length = 11)
    private String ruc;

    @Column(name = "razon_social", length = 200)
    private String razonSocial;

    @Column(name = "direccion", length = 300)
    private String direccion;

    @Column(name = "nombre_comercial", length = 200)
    private String nombreComercial;

    @Column(name = "pais", length = 100)
    private String pais;

    @Column(name = "departamento", length = 100)
    private String departamento;

    @Column(name = "provincia", length = 100)
    private String provincia;

    @Column(name = "distrito", length = 100)
    private String distrito;

    // Nuevos atributos - Configuración de correo
    @Column(name = "correo_soporte", length = 100)
    private String correoSoporte;

    @Column(name = "host_correo", length = 100)
    private String hostCorreo;

    @Column(name = "password_correo", length = 100)
    private String passwordCorreo;

    @Column(name = "puerto_correo")
    private Integer puertoCorreo;

    @Column(name = "usuario_correo", length = 100)
    private String usuarioCorreo;

    // Nuevos atributos - APIs externas
    @Column(name = "api_reniec_ruc", length = 255)
    private String apiReniecRuc;

    // Nuevos atributos - Configuración de base de datos PostgreSQL
    @Column(name = "host_db", length = 100)
    private String hostDb;

    @Column(name = "usuario_db", length = 100)
    private String usuarioDb;

    @Column(name = "password_db", length = 100)
    private String passwordDb;

    @Column(name = "base_datos", length = 100)
    private String baseDatos;
} 