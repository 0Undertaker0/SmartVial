SMARTVIAL Backend

Endpoints:
- POST /api/auth/login { username, password }
- GET /api/incidents (requires Authorization: Bearer <token>)
- POST /api/incidents

Run locally (sin Docker) con MySQL / XAMPP

1) Arranca XAMPP y activa MySQL.

2) Crear esquema en MySQL (usa phpMyAdmin o la consola `mysql`):

```powershell
# desde la carpeta del proyecto (ajusta usuario/contraseña si aplica)
mysql -u root -p < docs\database\schema_mysql.sql
```

3) Configurar variables de entorno:

```powershell
cd backend
copy .env.example .env
# Edita backend/.env si necesitas cambiar la URL (DATABASE_URL)
```

4) Instalar dependencias, crear usuario y arrancar:

```powershell
npm install
node scripts/create-user.js agent1 agentpass 3   # crea usuario de prueba
npm start
```

5) Probar login (desde PowerShell):

```powershell
$body = @{ username='agent1'; password='agentpass' } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/auth/login -Method POST -ContentType 'application/json' -Body $body
```

Notas:
- Este backend usa MySQL (via `mysql2`). Asegúrate que `DATABASE_URL` en `backend/.env` apunta a tu instancia MySQL.
- Si prefieres usar Postgres en otro momento, puedo volver a añadir soporte, pero actualmente el proyecto está configurado para MySQL/XAMPP.
