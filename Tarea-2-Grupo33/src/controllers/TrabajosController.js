import prisma from '../prismaClient.js'

const createTrabajo = async (req, res, next) => {
    const { descripcion, sueldo } = req.body;

    if (!descripcion || typeof descripcion !== 'string' || isNaN(sueldo)) {
        return next({ message: 'Bad request', status: 400 });
    }

    try {
        const newTrabajo = await prisma.trabajos.create({
            data: {
                descripcion,
                sueldo
            }
        })
        res.status(200).json(newTrabajo);
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getTrabajos = async (req, res,next) => {
    try {
        const trabajos = await prisma.trabajos.findMany();
        res.status(200).json(trabajos);
        } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getTrabajoById = async (req, res, next) => {
    const { id } = req.params;
    const trabajoId = Number(id);

    if (!Number.isInteger(trabajoId)) {
        return next({ message: 'Bad request', status: 400 });
    }

    try {
        const trabajo = await prisma.trabajos.findUnique({ where: { id: trabajoId } });
        if (!trabajo) {
            return next({ message: 'Not Found', status: 404 });
        }
        res.status(200).json(trabajo);
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const updateTrabajo = async (req, res, next) => {
    const { id } = req.params;
    const { descripcion, sueldo } = req.body;
    const trabajoId = Number(id);

    if (!Number.isInteger(trabajoId) || !descripcion || typeof descripcion !== 'string' || isNaN(sueldo)) {
        return next({ message: 'Bad request', status: 400 });
    }

    try {
        const updatedTrabajo = await prisma.trabajos.update({
            where: { id: trabajoId },
            data: { descripcion, sueldo }
        });

        if (!updatedTrabajo) {
            return next({ message: 'Not Found', status: 404 });
        }

        res.status(200).json(updatedTrabajo);
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const deleteTrabajo = async (req, res,next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        const error = new Error('Bad request');
        error.status = 400;
        next(error);
        return;
    }

    try {
        // Check if the job exists
        const trabajo = await prisma.trabajos.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!trabajo) {
            const error = new Error('Not Found');
            error.status = 404;
            next(error);
            return;
        }

        // Find the personajes related to the job
        const personajesRelacionados = await prisma.personaje_tiene_trabajo.findMany({
            where: {
                id_trabajo: parseInt(id),
            },
        });

        // Delete the relations in the joining table
        const deleteRelaciones = personajesRelacionados.map(relacion => {
            return prisma.personaje_tiene_trabajo.delete({
                where: { 
                    id_trabajo_id_personaje: {
                        id_trabajo: relacion.id_trabajo,
                        id_personaje: relacion.id_personaje
                    }
                },
            });
        });
        await Promise.all(deleteRelaciones);

        // Delete the job
        const deleteTrabajo = await prisma.trabajos.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.status(200).json(deleteTrabajo);
    } catch (error) {
        error.status = error.status || 500; // Internal Server Error
        next(error);
    }
}



  

const TrabajosController = {
    createTrabajo,
    getTrabajos,
    getTrabajoById,
    updateTrabajo,
    deleteTrabajo
}

export default TrabajosController;