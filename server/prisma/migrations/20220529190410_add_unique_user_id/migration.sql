/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Vault` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vault_user_id_key" ON "Vault"("user_id");
