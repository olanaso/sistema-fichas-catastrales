"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, CheckCircle, XCircle } from "lucide-react";

export function EmailTestForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEmail = async () => {
    if (!email) {
      setResult({ success: false, message: "Por favor ingresa un correo electrónico" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, message: data.error || "Error al enviar el correo de prueba" });
      }
    } catch (error) {
      setResult({ success: false, message: "Error de conexión. Por favor, inténtalo de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Probar Configuración de Correo
        </CardTitle>
        <CardDescription>
          Envía un correo de prueba para verificar que la configuración de Gmail funciona correctamente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{result.message}</AlertDescription>
            </div>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="test-email">Correo de Prueba</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={handleTestEmail}
          disabled={isLoading || !email}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando Prueba...
            </>
          ) : (
            "Enviar Correo de Prueba"
          )}
        </Button>

        <div className="text-sm text-gray-600">
          <p><strong>Nota:</strong> Asegúrate de que:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>La configuración de Gmail esté habilitada</li>
            <li>Las credenciales sean correctas</li>
            <li>El correo de destino sea válido</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 