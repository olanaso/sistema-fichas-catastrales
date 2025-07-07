-- Script para insertar los roles del sistema
-- Solo se ejecutará si no existen los roles

INSERT INTO rol (codigo, rol) 
SELECT 'ADMIN', 'Administrador' 
WHERE NOT EXISTS (SELECT 1 FROM rol WHERE codigo = 'ADMIN');

INSERT INTO rol (codigo, rol) 
SELECT 'SUPERVISOR', 'Supervisor' 
WHERE NOT EXISTS (SELECT 1 FROM rol WHERE codigo = 'SUPERVISOR');

INSERT INTO rol (codigo, rol) 
SELECT 'INSPECTOR', 'Inspector' 
WHERE NOT EXISTS (SELECT 1 FROM rol WHERE codigo = 'INSPECTOR'); 