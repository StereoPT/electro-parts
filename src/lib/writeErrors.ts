import { Prisma } from "@/generated/prisma/client";

// Turns a unique-constraint violation (P2002) into a duplicate result the form
// can show inline on the name field; any other error is rethrown.
export const handleUniqueViolation = (error: unknown, message: string) => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return {
      success: false,
      fieldErrors: { name: [message] },
    } as const;
  }

  throw error;
};
