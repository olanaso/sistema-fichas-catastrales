# Sistema Fichas Catastrales

Este proyecto es un ejemplo sencillo de backend usando Spring Boot con autenticación JWT y un CRUD para la entidad `Person`.

## Requisitos
- Java 21
- Maven 3

## Endpoints principales
- `POST /auth/login` – Autenticación de usuarios.
- `GET /persons` – Listar personas (restringido a usuarios autenticados).
- `POST /persons` – Crear persona (requiere rol `ADMIN`).
- `PUT /persons/{id}` – Actualizar persona (requiere rol `ADMIN`).
- `DELETE /persons/{id}` – Eliminar persona (requiere rol `ADMIN`).

La documentación OpenAPI/Swagger se genera en `/swagger-ui.html` cuando la aplicación está en ejecución.
