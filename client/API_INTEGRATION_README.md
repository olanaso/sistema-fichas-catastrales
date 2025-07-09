# Integración con API de Java - Sistema de Fichas Catastrales

## Configuración Completada

Se ha configurado completamente el sistema frontend para integrarse con tu API de Java. A continuación se detallan los cambios realizados:

## 📁 Archivos Configurados

### 1. Modelos (`src/models/`)
- **`usuario.ts`**: Actualizado para coincidir con `UsuarioEntity` de Java
  - Incluye DNI, nombres, apellidos, email, password, activo y roles
  - Interfaces para requests/responses de autenticación
  - **NUEVO**: Soporte para autoridades de Spring Security
  - **NUEVO**: Campos de estado de cuenta (enabled, accountNonLocked, etc.)

### 2. Configuración de API (`src/lib/`)
- **`axios.ts`**: Cliente HTTP configurado con interceptores JWT
- **`config.ts`**: Configuración centralizada de la aplicación
  - **NUEVO**: Configuración de autoridades de Spring Security

### 3. Servicios (`src/modules/`)
- **`auth/services/auth.service.ts`**: Servicio de autenticación
  - **NUEVO**: Manejo de refresh tokens
  - **NUEVO**: Verificación de autoridades
  - **NUEVO**: Verificación de estado de cuenta
- **`usuarios/services/usuario.service.ts`**: Servicio de gestión de usuarios

### 4. Acciones (`src/modules/`)
- **`auth/actions/auth.actions.ts`**: Acciones de autenticación
- **`auth/actions/password-reset.actions.ts`**: Acciones de recuperación de contraseña
- **`usuarios/action/usuario.actions.ts`**: Acciones de gestión de usuarios

### 5. Hooks y Componentes
- **`hooks/use-auth.ts`**: Hook personalizado para autenticación
  - **NUEVO**: Funciones de verificación de autoridades
  - **NUEVO**: Funciones de verificación de estado de cuenta
- **`components/auth/protected-route.tsx`**: Componente de protección de rutas
  - **NUEVO**: Verificación de autoridades
  - **NUEVO**: Verificación de estado de cuenta

### 6. Middleware
- **`middleware.ts`**: Actualizado para manejar autenticación JWT

## 🔧 Configuración de la API

### Estructura de Respuesta Real

La API devuelve la siguiente estructura:

```json
{
    "success": true,
    "message": "Autenticación exitosa",
    "data": {
        "accessToken": "eyJhbGciOiJIUzM4NCJ9...",
        "message": "Login exitoso",
        "user": {
            "id": 1,
            "dni": "75688249",
            "nombres": "Jorge",
            "apellidos": "Duchman",
            "email": "jduchman10@gmail.com",
            "activo": true,
            "rol": [
                {
                    "id": 1,
                    "codigo": "ADMIN",
                    "rol": "Administrador"
                }
            ],
            "enabled": true,
            "credentialsNonExpired": true,
            "accountNonExpired": true,
            "authorities": [
                {
                    "authority": "ROLE_ADMIN"
                }
            ],
            "username": "jduchman10@gmail.com",
            "accountNonLocked": true
        },
        "refreshToken": "dfc0801e-e73d-4f17-a83c-440701507da4"
    },
    "timestamp": "2025-07-08T16:28:39.0131538"
}
```

### Endpoints Configurados

#### Autenticación
- `POST /auth/login` - Inicio de sesión ✅
- `POST /auth/forgot-password` - Recuperación de contraseña ✅
- `POST /auth/reset-password` - Restablecimiento de contraseña ✅

#### Usuarios (Preparado para futuros endpoints)
- `GET /usuarios` - Lista de usuarios (paginada)
- `GET /usuarios/{id}` - Obtener usuario por ID
- `POST /usuarios` - Crear usuario
- `PUT /usuarios/{id}` - Actualizar usuario
- `DELETE /usuarios/{id}` - Eliminar usuario
- `PATCH /usuarios/{id}/status` - Cambiar estado del usuario
- `GET /usuarios/search` - Buscar usuarios
- `GET /usuarios/rol/{codigo}` - Usuarios por rol

## 🚀 Cómo Usar

### 1. Instalar Dependencias
```bash
npm install axios
```

### 2. Configurar Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081
```

### 3. Usar el Hook de Autenticación
```tsx
import { useAuth } from '@/hooks/use-auth';

function LoginComponent() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      // Redirigir al dashboard
    }
  };
}
```

### 4. Proteger Rutas con Roles
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

function DashboardPage() {
  return (
    <ProtectedRoute requiredRoles={['ADMIN', 'USER']}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### 5. Proteger Rutas con Autoridades (Spring Security)
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

function AdminPanel() {
  return (
    <ProtectedRoute requiredAuthorities={['ROLE_ADMIN']}>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### 6. Verificar Roles y Autoridades
```tsx
import { useAuth } from '@/hooks/use-auth';

function AdminPanel() {
  const { hasRole, hasAnyRole, hasAuthority, hasAnyAuthority } = useAuth();

  // Verificar roles
  if (hasRole('ADMIN')) {
    return <AdminContent />;
  }

  if (hasAnyRole(['ADMIN', 'MANAGER'])) {
    return <ManagerContent />;
  }

  // Verificar autoridades (Spring Security)
  if (hasAuthority('ROLE_ADMIN')) {
    return <AdminContent />;
  }

  if (hasAnyAuthority(['ROLE_ADMIN', 'ROLE_MANAGER'])) {
    return <ManagerContent />;
  }
}
```

### 7. Verificar Estado de la Cuenta
```tsx
import { useAuth } from '@/hooks/use-auth';

function UserProfile() {
  const { 
    isAccountEnabled, 
    isAccountNonLocked, 
    isCredentialsNonExpired, 
    isAccountNonExpired 
  } = useAuth();

  if (!isAccountEnabled()) {
    return <AccountDisabledMessage />;
  }

  if (!isAccountNonLocked()) {
    return <AccountLockedMessage />;
  }

  if (!isCredentialsNonExpired()) {
    return <CredentialsExpiredMessage />;
  }

  if (!isAccountNonExpired()) {
    return <AccountExpiredMessage />;
  }

  return <UserProfileContent />;
}
```

## 🔐 Estructura de Autenticación

### Token JWT
- Se almacena en `localStorage` como `auth_token`
- Se envía automáticamente en el header `Authorization: Bearer {token}`
- Se maneja automáticamente la expiración (redirección a login)

### Refresh Token
- Se almacena en `localStorage` como `refresh_token`
- Disponible para futuras implementaciones de renovación automática

### Usuario
- Se almacena en `localStorage` como `user`
- Incluye información completa del usuario, roles y autoridades
- Se actualiza automáticamente en cada login

### Roles y Autoridades
- **Roles**: Se verifica automáticamente en componentes protegidos
- **Autoridades**: Soporte completo para Spring Security authorities
- Soporte para verificación individual o múltiple
- Configuración centralizada en `src/lib/config.ts`

## 📋 Estructura de Datos

### Usuario
```typescript
interface Usuario {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  password?: string;
  activo: boolean;
  rol: Rol[];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
}
```

### Rol
```typescript
interface Rol {
  id: number;
  codigo: string;
  rol: string;
}
```

### Authority (Spring Security)
```typescript
interface Authority {
  authority: string;
}
```

## 🔄 Flujo de Autenticación

1. **Login**: Usuario ingresa credenciales → API valida → Retorna estructura completa con JWT + datos usuario
2. **Almacenamiento**: Access token, refresh token y usuario se guardan en localStorage
3. **Peticiones**: Interceptor agrega automáticamente el access token
4. **Expiración**: Si token expira (401), se redirige automáticamente al login
5. **Logout**: Se eliminan todos los datos del localStorage y redirige al login

## 🛡️ Seguridad

- **Tokens JWT**: Manejo seguro con interceptores automáticos
- **Refresh Tokens**: Preparado para renovación automática
- **Protección de rutas**: Middleware y componentes de protección
- **Verificación de roles**: Control de acceso basado en roles
- **Verificación de autoridades**: Control de acceso basado en Spring Security authorities
- **Estado de cuenta**: Verificación completa del estado de la cuenta
- **Manejo de errores**: Interceptores para errores de autenticación

## 📝 Próximos Pasos

1. **Implementar endpoints de usuarios** en tu API de Java
2. **Configurar CORS** en tu servidor Java para permitir peticiones desde el frontend
3. **Ajustar roles y autoridades** en `src/lib/config.ts` según tu sistema
4. **Personalizar mensajes de error** según tus necesidades
5. **Implementar refresh token automático** si es necesario

## 🔧 Personalización

### Cambiar URL de la API
Editar `src/lib/config.ts`:
```typescript
api: {
  baseUrl: 'http://tu-servidor:puerto',
}
```

### Agregar Nuevos Roles
Editar `src/lib/config.ts`:
```typescript
roles: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MANAGER: 'MANAGER',
  // Agregar nuevos roles aquí
}
```

### Agregar Nuevas Autoridades
Editar `src/lib/config.ts`:
```typescript
authorities: {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
  ROLE_MANAGER: 'ROLE_MANAGER',
  // Agregar nuevas autoridades aquí
}
```

### Modificar Rutas Protegidas
Editar `src/lib/config.ts`:
```typescript
protectedRoutes: [
  '/dashboard',
  '/usuarios',
  // Agregar nuevas rutas aquí
]
```

## ✅ Estado de la Configuración

- ✅ Modelos actualizados con estructura real de API
- ✅ Configuración de axios con interceptores JWT
- ✅ Servicios de autenticación con refresh tokens
- ✅ Servicios de usuarios preparados
- ✅ Acciones actualizadas para estructura real
- ✅ Hook de autenticación con autoridades y estado de cuenta
- ✅ Componente de protección de rutas avanzado
- ✅ Middleware actualizado
- ✅ Configuración centralizada con autoridades
- ✅ Manejo de errores completo
- ✅ Interceptores JWT automáticos
- ✅ Soporte completo para Spring Security

El sistema está completamente configurado y adaptado a la estructura real de tu API de Java. Solo necesitas instalar axios y configurar las variables de entorno. 