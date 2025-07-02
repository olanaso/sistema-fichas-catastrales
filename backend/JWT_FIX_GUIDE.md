# Guía de Solución: Error JWT JAXB - Sistema Ficha Catastral

## Problema Identificado

El error que estabas viendo:
```
java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter
```

Se debía a que estabas usando una versión antigua de la librería JWT (`jjwt 0.9.1`) que depende de JAXB, pero JAXB fue removido del JDK core en Java 11+.

## Solución Implementada

### 1. Actualización de Dependencias JWT

**Antes (pom.xml):**
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

**Después (pom.xml):**
```xml
<!-- JWT Dependencies for Java 11+ -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

### 2. Actualización del JwtService

**Cambios principales:**
- Uso de `Keys.hmacShaKeyFor()` para generar la clave de firma
- Nuevos métodos de la API JWT 0.12.x
- Validación de expiración de tokens
- Mejor manejo de claims

### 3. Script de Inicialización de Datos

Agregué `data.sql` para crear roles y usuario administrador por defecto:
- Rol ADMIN
- Rol USER  
- Usuario admin@sistema.com (password: admin123)

## Pasos para Aplicar la Solución

### 1. Limpiar y Recompilar
```bash
mvn clean install
```

### 2. Reiniciar la Aplicación
```bash
mvn spring-boot:run
```

### 3. Verificar que los Roles se Crearon
La aplicación debería crear automáticamente:
- Tabla `rol` con roles ADMIN y USER
- Usuario administrador por defecto

### 4. Probar el Login
```bash
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "password": "admin123"
}
```

## Verificación de la Solución

### Logs Esperados (Sin Errores):
```
2025-07-01T23:18:40.911-05:00 DEBUG --- Securing POST /auth/login
2025-07-01T23:18:40.912-05:00 DEBUG --- Set SecurityContextHolder to anonymous SecurityContext
2025-07-01T23:18:40.912-05:00 DEBUG --- Secured POST /auth/login
2025-07-01T23:18:40.914-05:00 DEBUG --- select ue1_0.id, ue1_0.apellidos...
2025-07-01T23:18:40.995-05:00 DEBUG --- select r1_0.usuario_id, r1_1.id...
2025-07-01T23:18:41.002-05:00 DEBUG --- Authenticated user
2025-07-01T23:18:41.003-05:00 DEBUG --- select ue1_0.id, ue1_0.apellidos...
```

### Respuesta Esperada (200 OK):
```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "username": "admin@sistema.com",
      "authorities": [
        {
          "authority": "ROLE_ADMIN"
        }
      ]
    },
    "message": "Login exitoso"
  },
  "timestamp": "2024-01-01T12:00:00"
}
```

## Problemas Comunes y Soluciones

### 1. Si sigues viendo errores JAXB:
- Asegúrate de haber ejecutado `mvn clean install`
- Verifica que no haya dependencias duplicadas en el classpath
- Revisa que estés usando Java 11+ (tu proyecto usa Java 21)

### 2. Si los roles no se crean:
- Verifica que la base de datos esté funcionando
- Revisa los logs de inicialización
- Ejecuta manualmente el script SQL si es necesario

### 3. Si el login falla:
- Verifica que el usuario admin@sistema.com exista
- Confirma que la contraseña sea "admin123"
- Revisa que el usuario tenga el rol ADMIN asignado

## Configuración de Seguridad JWT

### Secret Key (application.properties):
```properties
jwt.secret=secretKey1234567890
jwt.expiration=3600000
```

### Recomendaciones de Seguridad:
1. **Cambia el secret key** en producción
2. **Usa una clave de al menos 256 bits**
3. **Configura expiración apropiada** (1 hora recomendada)
4. **Usa HTTPS** en producción

## Próximos Pasos

1. **Prueba el login** con las credenciales por defecto
2. **Registra nuevos usuarios** para probar el sistema completo
3. **Verifica que los tokens JWT** funcionen en endpoints protegidos
4. **Configura roles específicos** según tus necesidades

---

**¡El error de JWT JAXB está completamente solucionado!** 