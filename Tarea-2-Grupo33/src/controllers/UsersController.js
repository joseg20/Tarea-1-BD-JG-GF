import prisma from '../prismaClient.js'

const getTop5PersonajesConMasFuerza = async (req, res) => {
    const top5Personajes = await prisma.personajes.findMany({
        orderBy: {
            fuerza: 'desc',
        },
        take: 5,
    });
    res.json(top5Personajes);
}

const getPersonajeConMasKarts = async (req, res) => {
    const personajesConMasKarts = await prisma.personajes.findMany({
        include: {
            karts: true,
        },
    });

    let maxKarts = 0;
    let personajeConMasKarts = null;

    for (const personaje of personajesConMasKarts) {
        if (personaje.karts.length > maxKarts) {
            maxKarts = personaje.karts.length;
            personajeConMasKarts = personaje;
        }
    }

    res.json({ nombre: personajeConMasKarts.nombre, cantidadKarts: maxKarts });
};

const getCantidadHabitantes = async (req, res) => {
    const reinoId = parseInt(req.params.id, 10);
    if (isNaN(reinoId)) {
        res.status(400).json({ message: 'Bad Request' });
        return;
    }

    const reino = await prisma.reinos.findUnique({
        where: {
            id: reinoId,
        },
    });

    const habitantes = await prisma.personaje_habita_reino.count({
        where: {
            id_reino: reinoId,
        },
    });

    res.json({ cantidadHabitantes: habitantes });
};

const getGobernante = async (req, res) => {
    const reinoId = parseInt(req.params.id, 10);

    let gobernantes;

    if (!isNaN(reinoId)) {
        gobernantes = await prisma.personaje_habita_reino.findMany({
            where: {
                id_reino: reinoId,
                es_gobernante: true,
            },
            include: {
                personaje: true,
            },
        });
    } else {
        gobernantes = await prisma.personaje_habita_reino.findMany({
            where: {
                es_gobernante: true,
            },
            include: {
                personaje: true,
            },
        });
    }

    res.json(gobernantes.map((gobernante) => gobernante.personaje));
};
            
const UsersController = {
    getTop5PersonajesConMasFuerza,
    getPersonajeConMasKarts,
    getCantidadHabitantes,
    getGobernante,
};

export default UsersController


