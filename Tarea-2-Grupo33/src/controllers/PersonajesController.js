import prisma from '../prismaClient.js'

const createPersonaje = async (req, res, next) => {
    const { nombre, fuerza, fecha_nacimiento, objeto, descripcion, sueldo, fecha_inicio, fecha_termino } = req.body;
    try {
        const newPersonaje = await prisma.personajes.create({
            data: 
            {
                nombre,
                fuerza,
                fecha_nacimiento,
                objeto,
                personaje_tiene_trabajo: 
                {
                    create: 
                    {
                        fecha_inicio,
                        fecha_termino,
                        trabajo: 
                        {
                            create: //cambiar por connect
                            {
                                descripcion,
                                sueldo
                            }
                        }
                    }
                }
            },
        })

        res.status(200).json(newPersonaje);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}


const getPersonajes = async (req , res, next) => {
    try {
        const personajes = await prisma.personajes.findMany({
            include: {
                personaje_tiene_trabajo: {
                    include: {
                        trabajo: true
                    }
                }
            }
        });

        res.status(200).json(personajes);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

// Obtener un personaje por ID con su relación trabajo.
const getPersonajeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                personaje_tiene_trabajo: { 
                    include: {
                        trabajo: true
                    }
                }
            }
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
    let { nombre, fuerza, fecha_nacimiento, objeto, fecha_inicio, fecha_termino,descripcion,sueldo } = req.body;
    try {
        let data = {};

        if(nombre) data.nombre = nombre;
        if(fuerza) data.fuerza = fuerza;
        if(fecha_nacimiento) data.fecha_nacimiento = fecha_nacimiento;
        if(objeto) data.objeto = objeto;


        const updatedPersonaje = await prisma.personajes.update({
            where: {
                id: parseInt(id),
            },
            data: data
        });

        res.status(200).json(updatedPersonaje);
    } catch (err) {
        if (err.code === 'P2025') {
            err.status = 404;
            err.message = 'Not Found';
        } else {
            err.status = 500;
        }
        next(err);
    }
}


const deletePersonaje = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Obtiene el trabajo del personaje antes de eliminarlo
        const trabajoPersonaje = await prisma.personaje_tiene_trabajo.findMany({
            where: {
                id_personaje: parseInt(id),
            },
            select: {
                id_trabajo: true
            }
        });

        // Elimina las relaciones del personaje y al personaje
        const deletedPersonaje = await prisma.$transaction([
            prisma.personaje_tiene_trabajo.deleteMany({
                where: {
                    id_personaje: parseInt(id),
                },
            }),
            prisma.personajes.delete({
                where: {
                    id: parseInt(id),
                },
            }),
        ]);

        // Si el personaje tenía un trabajo, verifica si es la última persona en ese trabajo
        if (trabajoPersonaje.length > 0) {
            for (let trabajo of trabajoPersonaje) {
                const personasEnTrabajo = await prisma.personaje_tiene_trabajo.count({
                    where: {
                        id_trabajo: trabajo.id_trabajo,
                    },
                });

                // Si es la última persona en el trabajo, elimina el trabajo
                if (personasEnTrabajo === 0) {
                    await prisma.trabajos.delete({
                        where: {
                            id: trabajo.id_trabajo,
                        },
                    });
                }
            }
        }

        res.status(200).json(deletedPersonaje[1]);
    } catch (err) {
        if (err.code === 'P2025') {
            err.status = 404;
            err.message = 'Not Found';
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



//probados los 5