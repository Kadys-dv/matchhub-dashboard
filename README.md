# MatchHub Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](#stack)
[![React](https://img.shields.io/badge/React-19-087EA4?style=for-the-badge&logo=react&logoColor=white)](#stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#stack)
[![Vercel](https://img.shields.io/badge/Vercel-demo-000000?style=for-the-badge&logo=vercel)](https://matchhub-dashboard.vercel.app/)

Painel web administrativo da plataforma PlayMatch. Projeto independente que consome a `matchhub-api` por uma camada BFF, mantendo a sessao administrativa em cookie HTTP-only e sem expor o token da API ao JavaScript do navegador.

## Demo e documentacao

- Demo: <https://matchhub-dashboard.vercel.app/>
- Estudo de caso: <https://kadys-dv.github.io/portfolio-rodrigo/projetos/matchhub-dashboard.html>
- API consumida: <https://github.com/Kadys-dv/matchhub-api>
- Arquitetura: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Problema

A operacao do PlayMatch precisa acompanhar partidas, atletas, denuncias e indicadores em uma interface unica. Como essas acoes sao administrativas, o painel nao pode tratar o navegador como ambiente confiavel nem guardar tokens sensiveis em JavaScript.

## Solucao

O dashboard usa Next.js como BFF: o navegador conversa com Route Handlers do proprio dashboard, e o servidor encaminha as chamadas para a MatchHub API. A sessao fica em cookie HTTP-only e a autorizacao definitiva continua no backend Java.

## Funcionalidades

- Autenticacao administrativa via BFF com cookie HTTP-only.
- Indicadores operacionais em tempo real.
- Criacao, conclusao, cancelamento e consulta de participantes das partidas.
- Busca e ativacao/desativacao de atletas.
- Fila de denuncias com resolucao administrativa.
- Relatorios consolidados e navegacao responsiva.
- Identidade visual PlayMatch com movimento 3D acessivel.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Route Handlers como BFF
- Zod para validacao de configuracao e formularios
- Vitest, Testing Library e jsdom
- ESLint, TypeScript e build de producao
- Docker multi-stage e GitHub Actions

## Executar localmente

1. Mantenha a `matchhub-api` ativa em <http://localhost:8080>.
2. Copie `.env.example` para `.env.local` se precisar alterar a URL.
3. Instale as dependencias:

```powershell
npm install
```

4. Rode o dashboard:

```powershell
npm run dev
```

5. Abra <http://localhost:3000>.

## Qualidade

```powershell
npm run check
npm run test:coverage
```

`npm run check` valida lint, tipos, testes e build de producao. `npm run test:coverage` gera o relatorio em `coverage/index.html`.

## Seguranca

- O token da API fica em cookie HTTP-only.
- Variaveis privadas permanecem somente no servidor.
- O navegador nao recebe o token da API diretamente.
- O controle de autorizacao definitivo pertence a MatchHub API.

## Publicacao

Importe o repositorio na Vercel, mantenha o framework detectado como Next.js e configure `MATCHHUB_API_URL` com a URL HTTPS publicada da API, sem barra no final. O projeto nao exige `vercel.json`; build, Route Handlers e runtime do servidor sao detectados automaticamente.

Desenvolvido por Dev Rodrigo. Todos os direitos reservados.
