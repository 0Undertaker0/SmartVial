# SmartVial
Desarrollo de proyecto SMARTVIAL
SMARTVIAL — Prototipo

Este repositorio contiene un prototipo funcional del proyecto SMARTVIAL (Sistema Inteligente de Gestión Digital de Siniestros Viales y Seguridad del Tránsito).

Estructura principal:
- docs/: Documentación de producto, diseño, arquitectura y tests.
- backend/: API Node.js + Express (JWT, RBAC, Postgres).
- frontend/: Frontend estático con Vue 3 (CDN) y Bootstrap 5.
- docker-compose.yml: Orquestación local (Postgres, backend, frontend).


Para empezar (desarrollo local SIN Docker):

Requisitos previos:
- Node.js v18+ instalado
- PostgreSQL instalado y accesible (puedes usar pgAdmin o psql)

1) Preparar la base de datos:

	- Crear la base de datos `smartvial` y ejecutar el script SQL:

	  ```powershell
	  # Desde una consola psql o pgAdmin ejecutar el script
	  psql -U postgres -d smartvial -f docs\database\schema.sql
	  ```

2) Backend:

	```powershell
	cd backend
	npm install
	copy .env.example .env
	# editar backend/.env si el DATABASE_URL apunta a otro host/puerto
	npm start
	```

	- El backend por defecto escuchará en http://localhost:4000

3) Crear un usuario de prueba (cuando el backend esté corriendo):

	```powershell
	node scripts/create-user.js agent1 agentpass 3
	```

4) Frontend (ser archivos estáticos con un servidor simple):

	```powershell
	cd frontend
	npx http-server -p 3000
	```

	- Abrir http://localhost:3000 en el navegador. Inicia sesión con `agent1` / `agentpass`.

Notas:
- Si prefieres usar Docker más adelante, el archivo `docker-compose.yml` fue eliminado en esta rama; puedo recuperarlo si lo deseas.
- Documentación completa en `docs/`.

Contacto: Equipo SMARTVIAL — Prototipo entregable.
