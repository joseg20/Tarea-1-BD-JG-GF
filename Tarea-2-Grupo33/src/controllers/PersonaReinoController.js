import prisma from '../prismaClient.js';

const createPersonaReino = async (req, res, next) => {
    const { id_reino, id_personaje, es_gobernante } = req.body;
    // Validación de datos
    if (!Number.isInteger(parseInt(id_reino)) ||
        !Number.isInteger(parseInt(id_personaje)) ||
        typeof es_gobernante != 'boolean') {
        return next({ status: 400, message: 'Bad request' }); // Bad Request
    }
    
    try {
        let fecha_registro = new Date(); // Crea la fecha de registro como la fecha y hora actuales
        const newRelPerRein = await prisma.personaje_habita_reino.create({
            data: {
                id_reino: parseInt(id_reino),
                id_personaje: parseInt(id_personaje),
                fecha_registro,
                es_gobernante
            },
        })
        if (!newRelPerRein) {
            throw new Error('Bad request');
        }
        res.status(200).json(newRelPerRein);  //OK
    } catch (error) {
        if (error.message === 'Bad request') {
            error.status = 400; // Bad Request
        }
        else if (error.code === 'P2002') {
            error.status = 400; // Bad Request - Unique constraint failed
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const getPersonaReino = async (req, res, next) => {
    try {
        const rel_per_reins = await prisma.personaje_habita_reino.findMany();
        res.status(200).json(rel_per_reins); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getPersonaReinoById = async (req, res, next) => {
    const { id_personaje, id_reino } = req.params;
    // Validación de datos
    if (!Number.isInteger(parseInt(id_reino)) ||
        !Number.isInteger(parseInt(id_personaje))) {
        return next({ status: 400, message: 'Bad request' }); // Bad Request
    }

    try {
        const rel_per_rein = await prisma.personaje_habita_reino.findUnique({
            where: {
                id_personaje_id_reino: {
                    id_personaje: parseInt(id_personaje),
                    id_reino: parseInt(id_reino),
                }
            },
        });
        if (!rel_per_rein) {
            throw new Error('Not Found');
        }
        res.status(200).json(rel_per_rein); //OK
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


const updatePersonaReino = async (req, res, next) => {
    const { es_gobernante } = req.body;
    const { id_personaje, id_reino } = req.params;

    // Validación de datos
    if (!Number.isInteger(parseInt(id_reino)) ||
        !Number.isInteger(parseInt(id_personaje)) ||
        (es_gobernante !== undefined && typeof es_gobernante !== 'boolean')) {
        return next({ status: 400, message: 'Bad request' }); // Bad Request
    }

    try {
        let data = {};

        if(es_gobernante !== undefined) data.es_gobernante = es_gobernante;
        
        data.fecha_registro = new Date();

        const updatedRelPerRein = await prisma.personaje_habita_reino.update({
            where: {
                id_personaje_id_reino: {
                    id_personaje: parseInt(id_personaje),
                    id_reino: parseInt(id_reino)
                }
            },
            data,
        })
        res.status(200).json(updatedRelPerRein);  //OK
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

const deletePersonaReino = async (req, res, next) => {
    const { id_personaje, id_reino } = req.params;

    // Validación de datos
    if (!Number.isInteger(parseInt(id_reino)) ||
        !Number.isInteger(parseInt(id_personaje))) {
        return next({ status: 400, message: 'Bad request' }); // Bad Request
    }

    try {
        const rel_per_rein = await prisma.personaje_habita_reino.delete({
            where: {
                id_personaje_id_reino: {
                    id_personaje: parseInt(id_personaje),
                    id_reino: parseInt(id_reino)
                }
            },
        });
        res.status(200).json(rel_per_rein); //OK
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404;
            error.message = 'Not Found';
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);

    }
}

const PersonaReinoController = {
    createPersonaReino,
    getPersonaReino,
    getPersonaReinoById,
    updatePersonaReino,
    deletePersonaReino
}

export default PersonaReinoController;

