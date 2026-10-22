## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one root `GLOSSARY.md` plus `docs/adr/`. See `docs/agents/domain.md`.

## Conventions

- **Next.js docs**: this Next version may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices.

- **Data access**: Prisma (`@/lib/prisma`) is only imported from `"use server"` actions in `src/actions/<entity>/<action>.ts`, one exported function per file. Reads and writes both go through actions; see `docs/adr/0001-server-actions-for-reads-and-writes.md`.
- **Hooks**: TanStack Query hooks wrap those actions in `src/hooks/<entity>/useX.ts` (e.g. `useExamples.ts`, `useCreateExample.ts`), one hook per file.
- **Query keys**: live in `src/constants/queryKeys.ts` (create it with the first hook).
- **Prisma client** is generated into `src/generated/prisma` (gitignored; `postinstall` runs `prisma generate`). Run `pnpm prisma migrate dev` after schema changes.
- **Lint/format**: Biome (`pnpm lint`, `pnpm format`). File names are camelCase or PascalCase.
