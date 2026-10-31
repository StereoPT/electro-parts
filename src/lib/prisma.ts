import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const configuredDatabaseUrl = process.env.DATABASE_URL;

if (!configuredDatabaseUrl) {
  throw new Error("DATABASE_URL is required to initialize electro-parts");
}

const createPrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: configuredDatabaseUrl });
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
