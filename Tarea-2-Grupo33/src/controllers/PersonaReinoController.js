import prisma from '../prismaClient.js';
const createPersonaReino = async (req, res, next) => {
    const { id_reino, id_personaje, es_gobernante } = req.body;
    try {
        if (!id_reino || !id_personaje || es_gobernante == null) {
            throw new Error('Bad request');
        }
        const fecha_registro = new Date(); // Crea la fecha de registro como la fecha y hora actuales
        const newRelPerRein = await prisma.personaje_habita_reino.create({
            data: {
                id_reino,
                id_personaje,
                fecha_registro,
                es_gobernante
            },
        })
        res.status(200).json(newRelPerRein);  //OK
    } catch (error) {
        if (error.message === 'Bad request') {
            error.status = 400;
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
    const { id } = req.params;
    try {
        const rel_per_rein = await prisma.personaje_habita_reino.delete({
            where: {
                id_personaje: parseInt(id),
                id_reino: parseInt(id)
            },
        });
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


const PersonaReinoController = {
    createPersonaReino,
    getPersonaReino,
    getPersonaReinoById,
    updatePersonaReino,
    deletePersonaReino
}

export default PersonaReinoController;