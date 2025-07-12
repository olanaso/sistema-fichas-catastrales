#!/bin/bash

# Script de prueba para la API de autenticación
# Asegúrate de que el servidor esté corriendo en localhost:8081

BASE_URL="http://localhost:8081/api"
TOKEN_FILE="temp_token.txt"

echo "=== Prueba de Autenticación JWT ==="
echo ""

# Función para limpiar archivo temporal
cleanup() {
    if [ -f "$TOKEN_FILE" ]; then
        rm "$TOKEN_FILE"
    fi
}

# Limpiar al salir
trap cleanup EXIT

echo "1. Probando login..."
echo "POST $BASE_URL/auth/login"
echo "Body: {\"usuario\": \"admin\", \"password\": \"123456\"}"
echo ""

RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "admin",
    "password": "123456"
  }')

echo "Respuesta:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Extraer token de la respuesta
TOKEN=$(echo "$RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Error: No se pudo extraer el token de la respuesta"
    exit 1
fi

echo "✅ Token extraído: ${TOKEN:0:50}..."
echo "$TOKEN" > "$TOKEN_FILE"

echo ""
echo "2. Probando validación de token..."
echo "POST $BASE_URL/auth/validate-token"
echo ""

VALIDATION_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/validate-token" \
  -H "Authorization: Bearer $TOKEN")

echo "Respuesta:"
echo "$VALIDATION_RESPONSE" | jq '.' 2>/dev/null || echo "$VALIDATION_RESPONSE"
echo ""

echo ""
echo "3. Probando logout..."
echo "POST $BASE_URL/auth/logout"
echo ""

LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Authorization: Bearer $TOKEN")

echo "Respuesta:"
echo "$LOGOUT_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGOUT_RESPONSE"
echo ""

echo ""
echo "4. Probando acceso a endpoint protegido..."
echo "GET $BASE_URL/usuarios"
echo ""

PROTECTED_RESPONSE=$(curl -s -X GET "$BASE_URL/usuarios" \
  -H "Authorization: Bearer $TOKEN")

echo "Respuesta:"
echo "$PROTECTED_RESPONSE" | jq '.' 2>/dev/null || echo "$PROTECTED_RESPONSE"
echo ""

echo "=== Pruebas completadas ===" 