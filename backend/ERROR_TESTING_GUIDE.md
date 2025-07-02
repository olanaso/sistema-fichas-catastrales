# Guía de Pruebas de Errores - Sistema Ficha Catastral

## Problema Solucionado: Error 500 en lugar de 401/403

He corregido el problema donde todas las excepciones devolvían error 500. Ahora el sistema maneja correctamente los códigos de estado HTTP:

- **401 Unauthorized**: Para credenciales incorrectas o usuario no encontrado
- **403 Forbidden**: Para acceso denegado (sin permisos)
- **404 Not Found**: Para recursos no encontrados
- **400 Bad Request**: Para datos inválidos
- **500 Internal Server Error**: Solo para errores internos reales

## Archivos Creados/Modificados

### Nuevos Archivos:
1. **CustomAuthenticationEntryPoint.java** - Maneja errores 401
2. **CustomAccessDeniedHandler.java** - Maneja errores 403

### Archivos Modificados:
1. **SecurityConfig.java** - Configurado para usar manejadores personalizados
2. **AuthController.java** - Manejo específico de excepciones de autenticación
3. **GlobalExceptionHandler.java** - Agregado manejo de UsernameNotFoundException

## Pruebas de Errores

### 1. Prueba de Credenciales Incorrectas (401)

```bash
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "email": "usuario_inexistente@example.com",
  "password": "password_incorrecta"
}
```

**Respuesta esperada (401):**
```json
{
  "status": 401,
  "error": "Credenciales inválidas",
  "message": "El email o la contraseña son incorrectos",
  "path": "/api/auth/login",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 2. Prueba de Usuario No Encontrado (401)

```bash
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "email": "usuario_que_no_existe@example.com",
  "password": "cualquier_password"
}
```

**Respuesta esperada (401):**
```json
{
  "status": 401,
  "error": "Usuario no encontrado",
  "message": "Usuario no encontrado con email: usuario_que_no_existe@example.com",
  "path": "/api/auth/login",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 3. Prueba de Acceso Sin Token (401)

```bash
GET http://localhost:8081/api/usuarios
```

**Respuesta esperada (401):**
```json
{
  "status": 401,
  "error": "No autenticado",
  "message": "Debe proporcionar credenciales válidas para acceder a este recurso",
  "path": "/api/usuarios",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 4. Prueba de Acceso Denegado (403)

```bash
GET http://localhost:8081/api/usuarios
Authorization: Bearer <token_de_usuario_sin_permisos>
```

**Respuesta esperada (403):**
```json
{
  "status": 403,
  "error": "Acceso denegado",
  "message": "No tienes permisos para acceder a este recurso",
  "path": "/api/usuarios",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 5. Prueba de Recurso No Encontrado (404)

```bash
GET http://localhost:8081/api/usuarios/999
Authorization: Bearer <token_válido>
```

**Respuesta esperada (404):**
```json
{
  "status": 404,
  "error": "Recurso no encontrado",
  "message": "Usuario no encontrado con id : 999",
  "path": "/api/usuarios/999",
  "timestamp": "2024-01-01T12:00:00"
}
```

### 6. Prueba de Datos Inválidos (400)

```bash
POST http://localhost:8081/api/auth/register
Content-Type: application/json

{
  "nombres": "",
  "apellidos": "",
  "dni": "123",
  "email": "email_invalido",
  "edad": -5,
  "password": ""
}
```

**Respuesta esperada (400):**
```json
{
  "status": 400,
  "error": "Error de validación",
  "message": "Los datos proporcionados no son válidos",
  "path": "/api/auth/register",
  "timestamp": "2024-01-01T12:00:00",
  "errors": {
    "email": "debe ser una dirección de correo electrónico válida",
    "nombres": "no debe estar vacío",
    "password": "no debe estar vacío"
  }
}
```

## Flujo de Pruebas Recomendado

1. **Prueba endpoints públicos** primero:
   ```bash
   GET http://localhost:8081/api/test/public
   ```

2. **Prueba login con credenciales incorrectas**:
   ```bash
   POST http://localhost:8081/api/auth/login
   # Con datos incorrectos
   ```

3. **Registra un usuario válido**:
   ```bash
   POST http://localhost:8081/api/auth/register
   # Con datos válidos
   ```

4. **Haz login con credenciales correctas**:
   ```bash
   POST http://localhost:8081/api/auth/login
   # Con datos correctos
   ```

5. **Prueba endpoints protegidos** con el token obtenido

6. **Prueba endpoints sin token** para verificar 401

7. **Prueba endpoints con permisos insuficientes** para verificar 403

## Verificación de Logs

Para debuggear problemas, revisa los logs de la aplicación:

```bash
# En los logs deberías ver:
# - Excepciones específicas capturadas
# - Códigos de estado HTTP correctos
# - Mensajes de error descriptivos
```

## Códigos de Estado HTTP Correctos

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado
- **400 Bad Request**: Datos inválidos
- **401 Unauthorized**: No autenticado o credenciales incorrectas
- **403 Forbidden**: Sin permisos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno real

Ahora tu API debería devolver los códigos de estado HTTP apropiados en lugar del error 500 genérico. 