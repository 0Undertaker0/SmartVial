# Fase 3 — Arquitectura de Software (resumen)

## Componentes
- Frontend: SPA (Vue 3) — interfaz para Agentes, Supervisores, Administradores y Ciudadanos.
- Backend: Node.js + Express — API REST, autenticación JWT, RBAC.
- Base de datos: PostgreSQL (geospatial extension optional: PostGIS later).
- Storage: filesystem o S3 para evidencias (photos, docs).
- IA: servicio separado (microservicio) que consulta datos y Gemini API.
- Map: Leaflet.js en frontend con tiles públicos o Mapbox.

## Diagramas incluidos (texto)
- Arquitectura General: Frontend <-> Backend API <-> Postgres; Backend -> IA Service -> Gemini API; Storage (S3)
- Arquitectura de despliegue: Docker Compose (Postgres, Backend, Frontend), producción con Kubernetes opcional.

## Seguridad
- TLS/HTTPS a nivel de load balancer
- JWT con expiración corta y refresh tokens
- RBAC basado en roles y permisos en BD
- Registro de auditoría en tabla `audit_logs`

Más detalles técnicos en archivos de código en `backend/` y `docker-compose.yml`.
