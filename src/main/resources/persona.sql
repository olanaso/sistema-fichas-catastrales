-- Script de creacion de la tabla persona para PostgreSQL
CREATE TABLE persona (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    edad INTEGER,
    correo TEXT,
    dni TEXT NOT NULL UNIQUE
);
