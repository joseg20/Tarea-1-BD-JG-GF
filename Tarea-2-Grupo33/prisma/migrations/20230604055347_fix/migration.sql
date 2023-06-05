/*
  Warnings:

  - The primary key for the `diplomacias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `diplomacias` table. All the data in the column will be lost.
  - You are about to alter the column `modelo` on the `karts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `color` on the `karts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - The primary key for the `personaje_habita_reino` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `personaje_habita_reino` table. All the data in the column will be lost.
  - The primary key for the `personaje_tiene_trabajo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fecha_fin` on the `personaje_tiene_trabajo` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `personaje_tiene_trabajo` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `reinos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `ubicacion` on the `reinos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to drop the column `nombre` on the `trabajos` table. All the data in the column will be lost.
  - You are about to alter the column `descripcion` on the `trabajos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - Made the column `es_aliado` on table `diplomacias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `modelo` on table `karts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `karts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_registro` on table `personaje_habita_reino` required. This step will fail if there are existing NULL values in that column.
  - Made the column `es_gobernante` on table `personaje_habita_reino` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_inicio` on table `personaje_tiene_trabajo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `personajes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuerza` on table `personajes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_nacimiento` on table `personajes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `reinos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ubicacion` on table `reinos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `superficie` on table `reinos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `sueldo` to the `trabajos` table without a default value. This is not possible if the table is not empty.
  - Made the column `descripcion` on table `trabajos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "diplomacias" DROP CONSTRAINT "diplomacias_pkey",
DROP COLUMN "id",
ALTER COLUMN "es_aliado" SET NOT NULL,
ADD CONSTRAINT "diplomacias_pkey" PRIMARY KEY ("id_reino_1", "id_reino_2");

-- AlterTable
ALTER TABLE "karts" ALTER COLUMN "modelo" SET NOT NULL,
ALTER COLUMN "modelo" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "velocidad_maxima" DROP NOT NULL;

-- AlterTable
ALTER TABLE "personaje_habita_reino" DROP CONSTRAINT "personaje_habita_reino_pkey",
DROP COLUMN "id",
ALTER COLUMN "fecha_registro" SET NOT NULL,
ALTER COLUMN "fecha_registro" DROP DEFAULT,
ALTER COLUMN "es_gobernante" SET NOT NULL,
ADD CONSTRAINT "personaje_habita_reino_pkey" PRIMARY KEY ("id_personaje", "id_reino");

-- AlterTable
ALTER TABLE "personaje_tiene_trabajo" DROP CONSTRAINT "personaje_tiene_trabajo_pkey",
DROP COLUMN "fecha_fin",
DROP COLUMN "id",
ADD COLUMN     "fecha_termino" DATE,
ALTER COLUMN "fecha_inicio" SET NOT NULL,
ALTER COLUMN "fecha_inicio" SET DATA TYPE DATE,
ADD CONSTRAINT "personaje_tiene_trabajo_pkey" PRIMARY KEY ("id_trabajo", "id_personaje");

-- AlterTable
ALTER TABLE "personajes" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "fuerza" SET NOT NULL,
ALTER COLUMN "fecha_nacimiento" SET NOT NULL,
ALTER COLUMN "objeto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reinos" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "ubicacion" SET NOT NULL,
ALTER COLUMN "ubicacion" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "superficie" SET NOT NULL;

-- AlterTable
ALTER TABLE "trabajos" DROP COLUMN "nombre",
ADD COLUMN     "sueldo" INTEGER NOT NULL,
ALTER COLUMN "descripcion" SET NOT NULL,
ALTER COLUMN "descripcion" SET DATA TYPE VARCHAR(45);
