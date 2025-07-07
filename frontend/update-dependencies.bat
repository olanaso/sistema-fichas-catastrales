@echo off
echo ========================================
echo Actualizando dependencias del Frontend
echo ========================================

echo.
echo 1. Eliminando node_modules y package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo 2. Limpiando caché de npm...
npm cache clean --force

echo.
echo 3. Instalando dependencias actualizadas...
npm install

echo.
echo 4. Verificando instalación...
npm list --depth=0

echo.
echo ========================================
echo Actualización completada!
echo ========================================
echo.
echo Para iniciar el servidor de desarrollo:
echo npm start
echo.
pause 