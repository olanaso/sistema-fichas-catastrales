# Guía de Pruebas de la API - Sistema Ficha Catastral

## Configuración Completada

He configurado completamente tu sistema para manejar respuestas JSON y códigos de estado HTTP apropiados. Los cambios incluyen:

### 1. Manejo Global de Excepciones
- **GlobalExceptionHandler**: Maneja todas las excepciones y devuelve respuestas JSON consistentes
- **ErrorResponse**: Estructura estandarizada para errores
- **ResourceNotFoundException**: Excepción personalizada para recursos no encontrados

### 2. Respuestas JSON Estandarizadas
- **ApiResponse**: Clase genérica para respuestas exitosas
- Todas las respuestas ahora incluyen:
  - `success`: boolean indicando si la operación fue exitosa
  - `message`: mensaje descriptivo
  - `data`: datos de la respuesta
  - `timestamp`: momento de la respuesta

### 3. Configuración de Seguridad Mejorada
- CORS configurado correctamente
- Endpoints públicos permitidos
- Manejo de autenticación JWT mejorado

### 4. Controladores Actualizados
- **AuthController**: Respuestas JSON para login/registro
- **UsuarioController**: CRUD completo con respuestas JSON
- **TestController**: Endpoints de prueba

## Endpoints de Prueba

### Endpoints Públicos (No requieren autenticación)

#### 1. Prueba de Conectividad
```bash
GET http://localhost:8081/api/test/public
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Endpoint público funcionando correctamente",
  "data": "Endpoint público funcionando correctamente",
  "timestamp": "2024-01-01T12:00:00"
}
```

#### 2. Prueba de Datos
```bash
GET http://localhost:8081/api/test/data
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Datos obtenidos exitosamente",
  "data": {
    "message": "Datos de prueba",
    "timestamp": 1704110400000,
    "status": "success"
  },
  "timestamp": "2024-01-01T12:00:00"
}
```

#### 3. Prueba de Echo
```bash
POST http://localhost:8081/api/test/echo
Content-Type: application/json

{
  "test": "data",
  "number": 123
}
```

#### 4. Autenticación - Registro
```bash
POST http://localhost:8081/api/auth/register
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "dni": "12345678",
  "email": "juan@example.com",
  "edad": 25,
  "password": "password123"
}
```

#### 5. Autenticación - Login
```bash
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

### Endpoints Protegidos (Requieren autenticación)

#### 6. Obtener Usuarios (Requiere rol ADMIN)
```bash
GET http://localhost:8081/api/usuarios
Authorization: Bearer <token_jwt>
```

#### 7. Obtener Usuario por ID
```bash
GET http://localhost:8081/api/usuarios/1
Authorization: Bearer <token_jwt>
```

## Códigos de Estado HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Error en los datos enviados
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: No autorizado (sin permisos)
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

## Ejemplos de Respuestas de Error

### 404 - Recurso no encontrado
```json
{
  "status": 404,
  "error": "Recurso no encontrado",
  "message": "Usuario no encontrado con id : 999",
  "path": "/api/usuarios/999",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 401 - Credenciales inválidas
```json
{
  "status": 401,
  "error": "Credenciales inválidas",
  "message": "El email o la contraseña son incorrectos",
  "path": "/api/auth/login",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 403 - Acceso denegado
```json
{
  "status": 403,
  "error": "Acceso denegado",
  "message": "No tienes permisos para acceder a este recurso",
  "path": "/api/usuarios",
  "timestamp": "2024-01-01T12:00:00"
}
```

## Solución al Error 403

El error 403 que estabas experimentando se debía a:

1. **Configuración de seguridad muy restrictiva**: Solo permitía acceso a `/auth/**`
2. **Falta de configuración CORS**: Bloqueaba peticiones desde el frontend
3. **Manejo incorrecto de excepciones**: No devolvía respuestas JSON claras

### Cambios realizados:

1. **SecurityConfig actualizado**:
   - Agregados endpoints públicos (`/test/**`, `/api/test/**`)
   - Configuración CORS habilitada
   - Manejo de autenticación mejorado

2. **GlobalExceptionHandler**:
   - Maneja todas las excepciones de Spring Security
   - Devuelve respuestas JSON consistentes
   - Códigos de estado apropiados

3. **Configuración de respuestas JSON**:
   - `ApiResponse` para respuestas exitosas
   - `ErrorResponse` para errores
   - Configuración Jackson mejorada

## Próximos Pasos

1. **Ejecuta la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

2. **Prueba los endpoints públicos** primero para verificar que funcionan

3. **Registra un usuario** y obtén un token JWT

4. **Usa el token** para acceder a endpoints protegidos

5. **Verifica que las respuestas** sean JSON consistentes

Si sigues teniendo problemas, revisa los logs de la aplicación para ver errores específicos. 