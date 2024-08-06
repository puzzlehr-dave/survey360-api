-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(99) NOT NULL,
    "email" VARCHAR(99) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "status" "user_status" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role_name" VARCHAR(99) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(99) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);
