SMARTVIAL Frontend

Este frontend es estático (Vue 3 + Bootstrap + Leaflet). Para desarrollo rápido puedes servirlo con un servidor estático.

Ejecutar localmente:

```powershell
cd frontend
npx http-server -p 3000
# o si tienes Python 3: python -m http.server 3000
```

Abrir en el navegador: http://localhost:3000

Nota: el frontend hace fetch a `/api/*` en el mismo host; si el backend está en `localhost:4000` y el navegador bloquea CORS, inicia el backend con CORS habilitado (ya viene configurado) o ajusta los proxies según tu entorno.
