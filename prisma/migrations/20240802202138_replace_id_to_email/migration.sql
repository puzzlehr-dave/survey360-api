/*
  Warnings:

  - You are about to drop the column `user_id` on the `verification_code` table. All the data in the column will be lost.
  - Added the required column `email` to the `verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification_code" DROP COLUMN "user_id",
ADD COLUMN     "email" INTEGER NOT NULL;
