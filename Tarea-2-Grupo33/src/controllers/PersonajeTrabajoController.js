import prisma from '../prismaClient.js';


const createPersonajeTrabajo = async (req, res, next) => {
    const { id_trabajo, id_personaje, fecha_inicio, fecha_termino } = req.body;
    if (!Number.isInteger(id_trabajo) ||
        id_trabajo <= 0 ||
        !Number.isInteger(id_personaje) || 
        id_personaje <= 0 ||
        isNaN(new Date(fecha_inicio)) ||
        fecha_termino && isNaN(new Date(fecha_termino))){
            return next({ message: 'Bad request', status: 400 });
    }
    try {
        const newRelPerTrab = await prisma.personaje_tiene_trabajo.create({
            data: {
                id_trabajo,
                id_personaje,
                fecha_inicio,
                fecha_termino
            },
        })
        res.status(200).json(newRelPerTrab);  //OK
    } catch (error) {
        if (error.message === 'Bad request') {
            error.status = 400;
        }
        else if (error.code === 'P2002') {
            error.status = 400; // Bad Request
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const getPersonajeTrabajo = async (req, res, next) => {
    try {
        const rel_per_trabs = await prisma.personaje_tiene_trabajo.findMany();
        if (rel_per_trabs.length === 0) {
            throw new Error('Not Found');
        }
        res.status(200).json(rel_per_trabs); //OK
    } catch (error) {
        if (error.message === 'Not Found') {
            error.status = 404;
        } else {
        error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const getPersonajeTrabajoById = async (req, res, next) => {
    const { id_personaje, id_trabajo } = req.params;
    if (!Number.isInteger(parseInt(id_trabajo)) ||
        id_trabajo <= 0 ||
        !Number.isInteger(parseInt(id_personaje)) ||
        id_personaje <= 0) {
            return next({ message: 'Bad request', status: 400 });
        }
    try {
        const rel_per_trab = await prisma.personaje_tiene_trabajo.findMany({
            where: {
                AND: [
                    { id_personaje: parseInt(id_personaje) },
                    { id_trabajo: parseInt(id_trabajo) }
                ]
            },
        });
        if (!rel_per_trab) {
            throw new Error('Not Found');
        }
        res.status(200).json(rel_per_trab); //OK
    } catch (error) {
        if (error.message === 'Not Found') {
            error.status = 404;
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}


const updatePersonajeTrabajo = async (req, res, next) => {
    const { id_trabajo, id_personaje } = req.params;
    if (!Number.isInteger(parseInt(id_trabajo)) ||
        id_trabajo <= 0 ||
        !Number.isInteger(parseInt(id_personaje)) ||
        id_personaje <= 0) {
            return next({ message: 'Bad request', status: 400 });
        }
    let { fecha_inicio, fecha_termino } = req.body;
    try {
        let data = {};

        if(fecha_inicio) data.fecha_inicio = fecha_inicio;
        if(fecha_termino) data.fecha_termino = fecha_termino;

        const rel_per_trab = await prisma.personaje_tiene_trabajo.update({
            where: {
                id_trabajo_id_personaje: {
                    id_personaje: parseInt(id_personaje),
                    id_trabajo: parseInt(id_trabajo)
                }
            },
            data: data,
        });
        res.status(200).json(rel_per_trab); //OK
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Not Found';
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error);   
    }
}

const deletePersonajeTrabajo = async (req, res, next) => {
    const { id_trabajo, id_personaje } = req.params;
    if (!Number.isInteger(parseInt(id_trabajo)) ||
        id_trabajo <= 0 ||
        !Number.isInteger(parseInt(id_personaje)) ||
        id_personaje <= 0) {
            return next({ message: 'Bad request', status: 400 });
    }
    try {
        const rel_per_trab = await prisma.personaje_tiene_trabajo.delete({
            where: {
                id_trabajo_id_personaje: {
                    id_personaje: parseInt(id_personaje),
                    id_trabajo: parseInt(id_trabajo)
                }
            },
        });
        res.status(200).json(rel_per_trab); //OK
    } catch (error) {
        if (error.message === 'Not Found') {
            error.status = 404;
        } else {
            error.status = 500;
        }
        next(error);
    }
}

const PersonajeTrabajoController = {
    createPersonajeTrabajo,
    getPersonajeTrabajo,
    getPersonajeTrabajoById,
    updatePersonajeTrabajo,
    deletePersonajeTrabajo
}

export default PersonajeTrabajoController;
