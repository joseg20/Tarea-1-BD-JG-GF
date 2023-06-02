-- CreateTable
CREATE TABLE "personajes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "fuerza" INTEGER,
    "fecha_nacimiento" TIMESTAMP(3),
    "objeto" TEXT NOT NULL,

    CONSTRAINT "personajes_pkey" PRIMARY KEY ("id")
);
