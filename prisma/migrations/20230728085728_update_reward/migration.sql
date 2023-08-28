/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('ADMIN', 'PLAYER');

-- CreateEnum
CREATE TYPE "EReward" AS ENUM ('SYSTEM', 'DEPOSIT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "ERole" NOT NULL DEFAULT 'PLAYER';

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "type" "EReward" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
