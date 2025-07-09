/**
 * Utilidades para manejo de imágenes y logos
 */

/**
 * Construye la URL completa para un logo
 * @param logoPath - Ruta del logo (puede ser solo el nombre, una ruta completa o una URL completa)
 * @returns URL completa para acceder al logo
 */
export function getLogoUrl(logoPath?: string | null): string {
  if (!logoPath) {
    return '/placeholder.svg'; // Logo por defecto
  }

  // Si ya es una URL completa, la devolvemos tal como está
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    return logoPath;
  }

  // Si es una URL de data (base64), la devolvemos tal como está
  if (logoPath.startsWith('data:')) {
    return logoPath;
  }

  // Si es solo el nombre del archivo, construimos la ruta completa
  let fullPath = logoPath;
  if (!logoPath.startsWith('/logos/')) {
    fullPath = `/logos/${logoPath}`;
  }

  // Construir la URL completa usando el endpoint con parámetro path
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';
  return `${baseUrl}/configuracion/logo-file?path=${encodeURIComponent(fullPath)}`;
}

/**
 * Extrae solo el nombre del archivo de una ruta o URL completa
 * @param logoPath - Ruta o URL del logo
 * @returns Solo el nombre del archivo
 */
export function extractFilenameFromPath(logoPath?: string | null): string | null {
  if (!logoPath) return null;

  // Si es una URL de data, no podemos extraer nombre de archivo
  if (logoPath.startsWith('data:')) return null;

  // Si es una URL completa, extraer el nombre del archivo
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    const urlParts = logoPath.split('/');
    return urlParts[urlParts.length - 1] || null;
  }

  // Si es una ruta que termina con /logos/filename, extraer el filename
  if (logoPath.includes('/logos/')) {
    return logoPath.substring(logoPath.lastIndexOf('/') + 1);
  }

  // Si ya es solo el nombre del archivo
  return logoPath;
}

/**
 * Verifica si una ruta o URL es válida para mostrar como imagen
 * @param logoPath - Ruta o URL a verificar
 * @returns true si es una ruta válida para imagen
 */
export function isValidImagePath(logoPath?: string | null): boolean {
  if (!logoPath) return false;
  
  // URLs de data son válidas
  if (logoPath.startsWith('data:')) return true;
  
  // URLs HTTP/HTTPS son válidas
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) return true;
  
  // Rutas que contienen /logos/ son válidas
  if (logoPath.includes('/logos/')) return true;
  
  // Nombres de archivo simples son válidos
  if (logoPath.includes('.')) return true;
  
  return false;
}

/**
 * Construye la ruta completa para un logo (sin la URL base)
 * @param logoPath - Ruta del logo
 * @returns Ruta completa en formato /logos/filename
 */
export function buildLogoPath(logoPath?: string | null): string | null {
  if (!logoPath) return null;

  // Si ya es una ruta completa que empieza con /logos/
  if (logoPath.startsWith('/logos/')) {
    return logoPath;
  }

  // Si es solo el nombre del archivo, construir la ruta completa
  if (logoPath.includes('.')) {
    return `/logos/${logoPath}`;
  }

  return null;
} 