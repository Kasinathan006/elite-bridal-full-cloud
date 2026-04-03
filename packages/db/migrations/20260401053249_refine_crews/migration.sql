/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Crew` table. All the data in the column will be lost.
  - Added the required column `leadProfileId` to the `Crew` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "openToBookingsNote" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Crew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "leadProfileId" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Crew_leadProfileId_fkey" FOREIGN KEY ("leadProfileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Crew" ("description", "id", "name") SELECT "description", "id", "name" FROM "Crew";
DROP TABLE "Crew";
ALTER TABLE "new_Crew" RENAME TO "Crew";
CREATE TABLE "new_CrewMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "crewId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACCEPTED',
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CrewMember_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CrewMember_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CrewMember" ("crewId", "id", "joinedAt", "profileId", "role") SELECT "crewId", "id", "joinedAt", "profileId", "role" FROM "CrewMember";
DROP TABLE "CrewMember";
ALTER TABLE "new_CrewMember" RENAME TO "CrewMember";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
