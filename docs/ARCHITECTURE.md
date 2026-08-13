# Arquitetura do MatchHub Dashboard

```mermaid
flowchart LR
  B[Navegador] --> N[Next.js App Router]
  N --> R[Route Handlers / BFF]
  R -->|Cookie HTTP-only| A[MatchHub API]
  A --> P[(PostgreSQL)]
  V[Vercel] --> N
```

O navegador não acessa o JWT diretamente. Os Route Handlers formam a fronteira BFF, encaminham respostas controladas e distinguem sessão expirada de indisponibilidade da API.
