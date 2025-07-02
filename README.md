# Sistema de Fichas Catastrales

Sistema de gestión de fichas catastrales desarrollado con Spring Boot y PostgreSQL.

## Requisitos Previos

- Java 21
- Maven 3.8+
- Docker y Docker Compose

## Configuración de la Base de Datos

### 1. Iniciar PostgreSQL con Docker Compose

```bash
# Iniciar los servicios
docker-compose up -d

# Verificar que los servicios estén corriendo
docker-compose ps
```

### 2. Acceder a pgAdmin (Opcional)

- URL: http://localhost:8080
- Email: admin@siscat.com
- Password: admin123

### 3. Configuración de la Base de Datos

Los datos de conexión están configurados en `application.properties`:

- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: siscat_db
- **Usuario**: siscat_user
- **Contraseña**: siscat_password

## Ejecutar la Aplicación

### 1. Compilar el proyecto

```bash
mvn clean compile
```

### 2. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La aplicación estará disponible en: http://localhost:8081/api

### 3. Documentación de la API

- Swagger UI: http://localhost:8081/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8081/api/v3/api-docs

## Estructura del Proyecto

```
src/main/java/com/example/siscat/
├── config/          # Configuraciones de seguridad y JWT
├── controller/      # Controladores REST
├── dto/            # Objetos de transferencia de datos
├── exception/      # Manejo de excepciones
├── model/          # Entidades JPA
├── repository/     # Repositorios de datos
├── service/        # Lógica de negocio
├── session/        # Gestión de sesiones
└── util/           # Utilidades (JWT, etc.)
```

## Servicios Docker

### PostgreSQL
- **Imagen**: postgres:16-alpine
- **Puerto**: 5432
- **Volumen**: postgres_data

### pgAdmin
- **Imagen**: dpage/pgadmin4:latest
- **Puerto**: 8080
- **Volumen**: pgadmin_data

## Comandos Útiles

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f postgres

# Reiniciar servicios
docker-compose restart

# Eliminar volúmenes (cuidado: elimina todos los datos)
docker-compose down -v
```

## Configuración de Desarrollo

El archivo `application.properties` está configurado para:

- **Modo desarrollo**: `spring.jpa.hibernate.ddl-auto=update`
- **Logging detallado**: SQL queries y parámetros
- **Pool de conexiones**: Configurado con HikariCP
- **JWT**: Configurado para autenticación
- **CORS**: Habilitado para desarrollo

## Notas Importantes

1. La base de datos se crea automáticamente al iniciar PostgreSQL
2. Las tablas se crean automáticamente gracias a `ddl-auto=update`
3. Los datos persisten en el volumen Docker `postgres_data`
4. La aplicación corre en el puerto 8081 para evitar conflictos con pgAdmin

## Endpoints principales
- `POST /auth/login` – Autenticación de usuarios.
- `GET /persons` – Listar personas (restringido a usuarios autenticados).
- `POST /persons` – Crear persona (requiere rol `ADMIN`).
- `PUT /persons/{id}` – Actualizar persona (requiere rol `ADMIN`).
- `DELETE /persons/{id}` – Eliminar persona (requiere rol `ADMIN`).

- `GET /persons/session-info` – Ejemplo de acceso a la sesion del usuario.

La documentación OpenAPI/Swagger se genera en `/swagger-ui.html` cuando la aplicación está en ejecución.

## Sesión de usuario

Cada petición autenticada inicializa un bean `UserSession` con la información del
usuario logeado, sus roles y los parámetros de configuración relevantes. Este
bean tiene alcance de petición y puede inyectarse en cualquier controlador o
servicio.
