package com.example.siscat.model;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa la tabla "persona" en la base de datos.
 */
@Entity
@Table(name = "persona")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** nombre de la persona */
    @Column(name = "nombre", nullable = false)
    private String nombre;

    /** apellido de la persona */
    @Column(name = "apellido", nullable = false)
    private String apellido;

    /** edad puede ser nula */
    @Column(name = "edad")
    private Integer edad;

    /** correo electronico opcional */
    @Column(name = "correo")
    private String correo;

    /** documento de identidad unico y obligatorio */
    @Column(name = "dni", nullable = false, unique = true)
    private String dni;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }
}
