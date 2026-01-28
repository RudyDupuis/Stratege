-- CreateTable
CREATE TABLE "User" (
    "keycloakId" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "avatarId" INTEGER NOT NULL DEFAULT 1,
    "eloScore" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "User_pkey" PRIMARY KEY ("keycloakId")
);
