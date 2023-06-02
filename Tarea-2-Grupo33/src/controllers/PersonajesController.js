import prisma from '../prismaClient.js'

const createPersonaje = async (req, res, next) => {
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;
    try {
        if (!nombre || !fuerza || !fecha_nacimiento ) { //los not null
            throw new Error('Bad Request');
        }
        const newPersonaje = await prisma.personajes.create({
            data: {
                nombre,
                fuerza,
                fecha_nacimiento,
                objeto
            },
        })
        res.status(200).json(newPersonaje); // bien creado
    } catch (err) {
        if (err.message === 'Bad Request') {
            err.status = 400;
        } else {
            err.status = 500;  // Internal Server Error
        }
        next(err);
    }
}

const getPersonajes = async (req , res, next) => {
    try {
        const personajes = await prisma.personajes.findMany();
        res.status(200).json(personajes);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const getPersonajeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!personaje) {
            throw new Error('Not Found');
        }
        res.status(200).json(personaje);
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const updatePersonaje = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;
    try {
        const updatedPersonaje = await prisma.personajes.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nombre,
                fuerza,
                fecha_nacimiento,
                objeto
            },
        });
        if (!updatedPersonaje) {
            throw new Error('Not Found');
        }
        res.status(200).json(updatedPersonaje);
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const deletePersonaje = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPersonaje = await prisma.personajes.delete({
            where: {
                id: parseInt(id),
            },
        });
        if (!deletedPersonaje) {
            throw new Error('Not Found');
        }
        res.status(200).json(deletedPersonaje);
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const PersonajesController = {
    createPersonaje,
    getPersonajes,
    getPersonajeById,
    updatePersonaje,
    deletePersonaje,
}

export default PersonajesController
