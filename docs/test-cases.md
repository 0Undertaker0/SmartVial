# Fase 9 — QA: Casos de prueba

## Pruebas funcionales
- Login con credenciales válidas/ inválidas
- Crear incidente (completo) y ver en lista
- Subir fotografías y descargar evidencia
- Generar acta PDF desde incidente
- Acceso RBAC: Agente no puede acceder a Administración

## Pruebas de integración
- Backend + DB: CRUD de incidentes
- Frontend consumiendo endpoints de incidentes y auth

## Pruebas de seguridad
- Intentos de SQLi en formularios
- Tests CSRF y XSS en inputs de descripción

## Pruebas de rendimiento
- Carga: 100 usuarios concurrentes creando incidentes
- Map: carga y renderizado de 2000 marcadores


Cada caso debe mapearse a pasos y resultados esperados en la herramienta de QA (Jira, TestRail o similar).