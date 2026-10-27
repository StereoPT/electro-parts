-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "manufacturer" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Component" ("createdAt", "description", "id", "manufacturer", "name", "quantity", "updatedAt") SELECT "createdAt", coalesce("description", '') AS "description", "id", coalesce("manufacturer", '') AS "manufacturer", "name", "quantity", "updatedAt" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
CREATE UNIQUE INDEX "Component_name_manufacturer_key" ON "Component"("name", "manufacturer");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

