# API REST — SMARTVIAL (Resumen)

Base: `/api`

Auth
- POST /api/auth/login { username, password } -> { token }

Incidents (requires Authorization header)
- GET /api/incidents
- POST /api/incidents { incident_code, type, severity, occurred_at, description, latitude, longitude, address }
- GET /api/incidents/:id

Health
- GET /api/health

Notas: Esta es una versión prototipo. Añadir validaciones, paginación, filtros, endpoints para evidencias, fotos, usuarios, roles, reportes, notificaciones.
