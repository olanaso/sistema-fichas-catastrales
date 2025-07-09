import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/usuarios', '/configuracion', '/cuenta'];
  
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Para nuestro sistema basado en localStorage, el middleware no puede verificar el token
  // La verificación principal se hará en el cliente con el componente ProtectedRoute
  // El middleware solo se encarga de la lógica básica de rutas
  
  // Si está en una ruta de auth y ya está autenticado, redirigir al dashboard
  // (esto se manejará principalmente en el cliente)
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/usuarios/:path*',
    '/configuracion/:path*',
    '/cuenta/:path*',
    '/auth/:path*',
  ],
}; 