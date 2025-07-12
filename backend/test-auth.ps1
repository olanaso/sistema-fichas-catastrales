# Script de prueba para la API de autenticación (PowerShell)
# Asegúrate de que el servidor esté corriendo en localhost:8081

$BaseUrl = "http://localhost:8081/api"
$TokenFile = "temp_token.txt"

Write-Host "=== Prueba de Autenticación JWT ===" -ForegroundColor Green
Write-Host ""

# Función para limpiar archivo temporal
function Cleanup {
    if (Test-Path $TokenFile) {
        Remove-Item $TokenFile -Force
    }
}

# Limpiar al salir
Register-EngineEvent PowerShell.Exiting -Action { Cleanup }

Write-Host "1. Probando login..." -ForegroundColor Yellow
Write-Host "POST $BaseUrl/auth/login"
Write-Host "Body: {`"usuario`": `"admin`", `"password`": `"123456`"}"
Write-Host ""

$LoginBody = @{
    usuario = "admin"
    password = "123456"
} | ConvertTo-Json

try {
    $Response = Invoke-RestMethod -Uri "$BaseUrl/auth/login" -Method POST -Body $LoginBody -ContentType "application/json"
    
    Write-Host "Respuesta:" -ForegroundColor Cyan
    $Response | ConvertTo-Json -Depth 10
    Write-Host ""
    
    # Extraer token de la respuesta
    $Token = $Response.data.accessToken
    
    if (-not $Token) {
        Write-Host "❌ Error: No se pudo extraer el token de la respuesta" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Token extraído: $($Token.Substring(0, [Math]::Min(50, $Token.Length)))..." -ForegroundColor Green
    $Token | Out-File -FilePath $TokenFile -Encoding UTF8
    
} catch {
    Write-Host "❌ Error en login: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Respuesta completa: $($_.Exception.Response)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Probando validación de token..." -ForegroundColor Yellow
Write-Host "POST $BaseUrl/auth/validate-token"
Write-Host ""

try {
    $Headers = @{
        "Authorization" = "Bearer $Token"
    }
    
    $ValidationResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/validate-token" -Method POST -Headers $Headers
    
    Write-Host "Respuesta:" -ForegroundColor Cyan
    $ValidationResponse | ConvertTo-Json -Depth 10
    Write-Host ""
    
} catch {
    Write-Host "❌ Error en validación: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Probando logout..." -ForegroundColor Yellow
Write-Host "POST $BaseUrl/auth/logout"
Write-Host ""

try {
    $LogoutResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/logout" -Method POST -Headers $Headers
    
    Write-Host "Respuesta:" -ForegroundColor Cyan
    $LogoutResponse | ConvertTo-Json -Depth 10
    Write-Host ""
    
} catch {
    Write-Host "❌ Error en logout: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Probando acceso a endpoint protegido..." -ForegroundColor Yellow
Write-Host "GET $BaseUrl/usuarios"
Write-Host ""

try {
    $ProtectedResponse = Invoke-RestMethod -Uri "$BaseUrl/usuarios" -Method GET -Headers $Headers
    
    Write-Host "Respuesta:" -ForegroundColor Cyan
    $ProtectedResponse | ConvertTo-Json -Depth 10
    Write-Host ""
    
} catch {
    Write-Host "❌ Error en endpoint protegido: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "=== Pruebas completadas ===" -ForegroundColor Green 