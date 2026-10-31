# ElectroParts

A personal inventory of the electronic components you own, and how many of each.

## Features

- **Components**: keep a list of the parts you own, with name, manufacturer, description and quantity.
- **Categories**: group Components into a flat list of Categories (e.g. "Resistors"), and see how many Components each one holds.
- **Minimum Quantity**: set how many of a Component you want on hand. Components at or below it are flagged as low stock, and at zero as out of stock.
- **Adjustments**: record a Purchase or a Usage (for example, in a project) with a date and a reason. Quantity changes only through Adjustments, so the history always explains the number.
- **Adjustments page**: a read-only history of every Adjustment, newest first.

The domain language (Component, Quantity, Category, Adjustment, ...) is defined in [`GLOSSARY.md`](GLOSSARY.md).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- [Prisma](https://www.prisma.io) with PostgreSQL
- [TanStack Query](https://tanstack.com/query) on top of Server Actions
- [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) and [Base UI](https://base-ui.com)
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev)
- [Biome](https://biomejs.dev) for linting and formatting

## Getting started

You need [Node.js](https://nodejs.org), [pnpm](https://pnpm.io) and [Docker](https://www.docker.com) (for the local PostgreSQL).

```bash
pnpm install
cp .env.example .env   # then fill in the values
docker compose up -d
pnpm prisma migrate dev
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

- `pnpm install` also generates the Prisma client (`postinstall`).
- `.env` holds the `POSTGRES_*` credentials used by `docker-compose.yml` and the `DATABASE_URL` connection string (for example `postgresql://<user>:<password>@localhost:5432/<db>`).
- `docker compose up -d` starts PostgreSQL 17 with its data in a Docker volume.
- Run `pnpm prisma migrate dev` again after changing `prisma/schema.prisma`.

## Scripts

| Command                | What it does                  |
| ---------------------- | ----------------------------- |
| `pnpm dev`             | Start the development server |
| `pnpm build`           | Build for production          |
| `pnpm start`           | Run the production build      |
| `pnpm lint`            | Check code with Biome         |
| `pnpm format`          | Format code with Biome        |

## Project structure

```text
src/
├── actions/       # "use server" actions: the only place Prisma is used
├── app/           # routes and pages
├── components/    # UI, grouped by entity (components, categories, adjustments)
├── constants/     # table columns, query keys
├── hooks/         # TanStack Query hooks that wrap the actions
├── lib/           # shared helpers
└── schemas/       # Zod schemas shared by forms and actions
prisma/            # schema and migrations
docs/adr/          # architecture decision records
```

Data access goes through Server Actions for both reads and writes ([ADR 0001](docs/adr/0001-server-actions-for-reads-and-writes.md)), and Quantity changes only through Adjustments ([ADR 0002](docs/adr/0002-quantity-changes-only-through-adjustments.md)).
