# Fase 10 — DevOps

## Git Flow
- Feature branches: `feature/<ticket>`
- Release branches: `release/<version>`
- Main: `main` (producción), `develop` (integración)

## CI/CD
- GitHub Actions pipeline para: lint, tests unitarios, build imagenes Docker y push a registry privado.

## Docker
- Servicios: backend (Node), frontend (nginx static), postgres
- Volúmenes: postgres data, uploads

## Infra (producción)
- Orquestador: Kubernetes (EKS/AKS) o VPS con Docker Compose
- TLS: Managed LB (ACM) o cert-manager
- Storage: S3 compatible para evidencias

## Backups
- Backups diarios de Postgres, retención 30 días

## Monitorización
- Logs centralizados (ELK/Tempo)
- Métricas (Prometheus + Grafana)
