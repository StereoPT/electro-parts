import { Prisma } from "@/generated/prisma/client";

const DUPLICATE_COMPONENT_MESSAGE =
  "A component with this name and manufacturer already exists.";

// Turns a unique-constraint violation (P2002) into a duplicate result the form
// can show inline; any other error is rethrown.
export const handleComponentWriteError = (error: unknown) => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return {
      success: false,
      fieldErrors: { name: [DUPLICATE_COMPONENT_MESSAGE] },
    } as const;
  }

  throw error;
};
