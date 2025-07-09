# Ejemplos de Uso del Sistema de Autenticación

## 🔐 Páginas de Autenticación Actualizadas

### 1. Login (`/auth/login`)
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      toast.success("Inicio de sesión exitoso");
      router.push("/dashboard");
    } else {
      toast.error(result.error);
    }
  };
}
```

### 2. Forgot Password (`/auth/forgot-password`)
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const handleForgotPassword = async (data) => {
    const result = await forgotPassword(data);
    if (result.success) {
      toast.success("Correo enviado exitosamente");
    } else {
      toast.error(result.error);
    }
  };
}
```

### 3. Reset Password (`/auth/reset-password`)
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();

  const handleResetPassword = async (data) => {
    const result = await resetPassword(data);
    if (result.success) {
      toast.success("Contraseña restablecida exitosamente");
      router.push("/auth/login");
    } else {
      toast.error(result.error);
    }
  };
}
```

## 🛡️ Protección de Rutas

### 1. Protección Básica
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### 2. Protección con Roles
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={['ADMIN']}>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### 3. Protección con Autoridades (Spring Security)
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredAuthorities={['ROLE_ADMIN']}>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### 4. Protección Múltiple
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function ManagerPage() {
  return (
    <ProtectedRoute 
      requiredRoles={['ADMIN', 'MANAGER']}
      requiredAuthorities={['ROLE_ADMIN', 'ROLE_MANAGER']}
      checkAccountStatus={true}
    >
      <ManagerContent />
    </ProtectedRoute>
  );
}
```

## 🎯 Verificación de Permisos en Componentes

### 1. Verificación de Roles
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function UserProfile() {
  const { hasRole, hasAnyRole } = useAuth();

  return (
    <div>
      {hasRole('ADMIN') && (
        <AdminPanel />
      )}
      
      {hasAnyRole(['ADMIN', 'MANAGER']) && (
        <ManagerPanel />
      )}
      
      <UserPanel />
    </div>
  );
}
```

### 2. Verificación de Autoridades
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function SecurityPanel() {
  const { hasAuthority, hasAnyAuthority } = useAuth();

  return (
    <div>
      {hasAuthority('ROLE_ADMIN') && (
        <AdminSecurityPanel />
      )}
      
      {hasAnyAuthority(['ROLE_ADMIN', 'ROLE_SECURITY']) && (
        <SecurityPanel />
      )}
    </div>
  );
}
```

### 3. Verificación de Estado de Cuenta
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function AccountStatus() {
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

  return <AccountContent />;
}
```

## 🔄 Manejo de Estado de Autenticación

### 1. Hook Completo
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function AuthStatus() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    forgotPassword,
    resetPassword,
    hasRole,
    hasAnyRole,
    hasAuthority,
    hasAnyAuthority,
    isAccountEnabled,
    isAccountNonLocked,
    isCredentialsNonExpired,
    isAccountNonExpired
  } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div>
      <h1>Bienvenido, {user?.nombres} {user?.apellidos}</h1>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.rol?.[0]?.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

## 🎨 Componentes de UI con Autenticación

### 1. Navbar con Usuario
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const { user, logout } = useAuth();

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.nombres.charAt(0)}${user.apellidos.charAt(0)}`.toUpperCase();
  };

  return (
    <nav>
      <div className="user-info">
        <Avatar>
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
        <span>{user?.nombres} {user?.apellidos}</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
```

### 2. Menú Condicional
```tsx
"use client";

import { useAuth } from '@/hooks/use-auth';

export default function Sidebar() {
  const { hasRole, hasAuthority } = useAuth();

  return (
    <aside>
      <nav>
        <MenuItem href="/dashboard">Dashboard</MenuItem>
        
        {hasRole('ADMIN') && (
          <MenuItem href="/admin">Administración</MenuItem>
        )}
        
        {hasAuthority('ROLE_USER_MANAGEMENT') && (
          <MenuItem href="/users">Gestión de Usuarios</MenuItem>
        )}
        
        <MenuItem href="/profile">Perfil</MenuItem>
      </nav>
    </aside>
  );
}
```

## 🔧 Configuración Avanzada

### 1. Configuración de Roles
```typescript
// src/lib/config.ts
export const config = {
  roles: {
    ADMIN: 'ADMIN',
    USER: 'USER',
    MANAGER: 'MANAGER',
    SECURITY: 'SECURITY',
  },
  authorities: {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_USER: 'ROLE_USER',
    ROLE_MANAGER: 'ROLE_MANAGER',
    ROLE_USER_MANAGEMENT: 'ROLE_USER_MANAGEMENT',
    ROLE_REPORT_VIEWER: 'ROLE_REPORT_VIEWER',
  },
};
```

### 2. Rutas Protegidas
```typescript
// src/lib/config.ts
export const config = {
  protectedRoutes: [
    '/dashboard',
    '/usuarios',
    '/configuracion',
    '/cuenta',
    '/admin',
    '/reports',
  ],
};
```

## 🚀 Flujo Completo de Autenticación

### 1. Login → Dashboard
```tsx
// 1. Usuario ingresa credenciales
const result = await login({ email, password });

// 2. Si es exitoso, se redirige al dashboard
if (result.success) {
  router.push('/dashboard');
}

// 3. El dashboard está protegido
<ProtectedRoute requiredRoles={['ADMIN', 'USER']}>
  <DashboardContent />
</ProtectedRoute>
```

### 2. Verificación de Permisos
```tsx
// En cualquier componente
const { hasRole, hasAuthority } = useAuth();

// Verificar si puede acceder a funcionalidades específicas
if (hasRole('ADMIN') || hasAuthority('ROLE_USER_MANAGEMENT')) {
  // Mostrar opciones de administración
}
```

### 3. Logout
```tsx
// En el navbar o cualquier componente
const { logout } = useAuth();

const handleLogout = () => {
  logout(); // Limpia localStorage y redirige al login
  toast.success("Sesión cerrada exitosamente");
};
```

## 📝 Notas Importantes

1. **Tokens JWT**: Se manejan automáticamente en los interceptores de axios
2. **Refresh Tokens**: Están preparados para futuras implementaciones
3. **Estado de Cuenta**: Se verifica automáticamente en rutas protegidas
4. **Roles vs Autoridades**: 
   - Roles: Para lógica de negocio
   - Autoridades: Para Spring Security
5. **Manejo de Errores**: Automático con toast notifications
6. **Redirecciones**: Automáticas según el estado de autenticación

El sistema está completamente funcional y listo para usar con tu API de Java. 