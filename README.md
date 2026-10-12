# Under Control

Monorepo for the **Under Control** game.

## Structure

```
apps/
  api/          NestJS server
  web/          React + Vite + TanStack Router + Tailwind
packages/
  shared/       Shared game types (game, player, zone, actions)
  game-engine/  Game rules (turn resolution, income, combat, victory)
```

## Requirements

- Node.js 24 (see `.nvmrc`)
- pnpm 12 (`corepack enable pnpm`)

## Getting started

```bash
pnpm install
pnpm dev        # api on http://localhost:3000, web on http://localhost:5173
```

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Run api and web in watch mode    |
| `pnpm dev:api`      | Run only the api                 |
| `pnpm dev:web`      | Run only the web app             |
| `pnpm build`        | Build all packages and apps      |
| `pnpm typecheck`    | Type-check all packages and apps |
| `pnpm lint`         | Lint with ESLint                 |
| `pnpm format`       | Format with Prettier             |
| `pnpm format:check` | Check formatting                 |
