-- CreateTable
CREATE TABLE "verification_code" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("id")
);
