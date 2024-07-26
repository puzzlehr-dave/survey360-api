-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(99) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);
