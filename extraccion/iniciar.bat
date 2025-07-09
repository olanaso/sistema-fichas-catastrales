@echo off
REM Arranca el servidor Node.js en segundo plano
start "" cmd /k "cd /d %~dp0 && node app.js"
REM Espera unos segundos para asegurarse que el server arrancó (opcional)
timeout /t 2 > nul
REM Abre el navegador en la app
start "" http://localhost:3000
