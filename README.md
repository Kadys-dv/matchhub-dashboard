# MatchHub Dashboard

Painel web administrativo da plataforma PlayMatch. Projeto independente que consome a `matchhub-api` sem acoplamento ao aplicativo Flutter.

## Funcionalidades

- autenticação via BFF com token em cookie HTTP-only;
- indicadores operacionais em tempo real;
- criação, conclusão, cancelamento e participantes das partidas;
- busca e ativação/desativação de atletas;
- fila de denúncias com resolução administrativa;
- relatórios consolidados e navegação responsiva;
- identidade PlayMatch com movimento 3D acessível.

## Tecnologias

- Next.js 16, React 19 e TypeScript
- Tailwind CSS 4
- BFF com Route Handlers e sessão em cookie HTTP-only
- Zod para validação de configuração e formulários
- Vitest e Testing Library
- Docker multi-stage e GitHub Actions

## Execução local

1. Mantenha a `matchhub-api` ativa em `http://localhost:8080`.
2. Copie `.env.example` para `.env.local` se precisar alterar a URL.
3. Execute `npm install` e `npm run dev`.
4. Abra `http://localhost:3000`.

## Qualidade

Execute `npm run check` para validar lint, tipos, testes e build de produção.

## Segurança

O token da API fica em cookie HTTP-only e não é exposto ao JavaScript do navegador. Variáveis privadas permanecem somente no servidor. O controle de autorização definitivo continua pertencendo à API.

Desenvolvido por Dev Rodrigo • Todos os direitos reservados.
