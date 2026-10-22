# Server Actions for reads as well as writes

All data access goes through `"use server"` actions in `src/actions/`, and TanStack Query calls those actions for both `queryFn` (reads) and `mutationFn` (writes). Prisma is only ever imported there. We accept that actions are always POST, run sequentially per client, and aren't HTTP-cacheable, in exchange for one uniform, type-safe path from component to database with no hand-written Route Handlers. This pattern has worked well in previous projects.

## Considered Options

- **Route Handlers for reads, Server Actions for writes**: Next.js's recommended split; rejected to avoid maintaining a parallel REST layer for reads.

## Consequences

- Parallel `useQuery` calls on one page are serialized. If that becomes a bottleneck, move the hot reads to Server Components or Route Handlers rather than abandoning the pattern wholesale.
