/*
  Warnings:

  - The primary key for the `reino_defensas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `reino_defensas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reino_defensas" DROP CONSTRAINT "reino_defensas_pkey",
DROP COLUMN "id";
