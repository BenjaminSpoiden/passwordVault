/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "Vault" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "data" TEXT,
    "salt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Vault" ADD CONSTRAINT "Vault_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
