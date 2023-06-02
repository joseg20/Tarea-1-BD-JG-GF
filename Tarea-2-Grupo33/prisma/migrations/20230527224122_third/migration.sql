/*
  Warnings:

  - You are about to drop the `_defensasToreinos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_defensasToreinos" DROP CONSTRAINT "_defensasToreinos_A_fkey";

-- DropForeignKey
ALTER TABLE "_defensasToreinos" DROP CONSTRAINT "_defensasToreinos_B_fkey";

-- DropTable
DROP TABLE "_defensasToreinos";

-- CreateTable
CREATE TABLE "reino_defensas" (
    "id" SERIAL NOT NULL,
    "reinoId" INTEGER NOT NULL,
    "defensaId" INTEGER NOT NULL,

    CONSTRAINT "reino_defensas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reino_defensas_reinoId_defensaId_key" ON "reino_defensas"("reinoId", "defensaId");

-- AddForeignKey
ALTER TABLE "reino_defensas" ADD CONSTRAINT "reino_defensas_reinoId_fkey" FOREIGN KEY ("reinoId") REFERENCES "reinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reino_defensas" ADD CONSTRAINT "reino_defensas_defensaId_fkey" FOREIGN KEY ("defensaId") REFERENCES "defensas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
