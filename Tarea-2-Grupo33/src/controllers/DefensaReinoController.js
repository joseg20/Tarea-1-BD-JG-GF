import prisma from '../prismaClient.js';

//relacion defensa-reino
//PK, FK1: id_reino Integer
//PK, FK2: id_defensa Integer


const createDefensaReino = async (req, res, next) => {
    const { id_reino, id_defensa } = req.body;
    try {
        if (!id_reino || !id_defensa) {
            throw new Error('Bad request');
        }
        const newRelDefRein = await prisma.reino_defensas.create({
            data: {
                id_reino,
                id_defensa
            },
        })
        res.status(200).json(newRelDefRein);  //OK
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

const getDefensaReino = async (req, res, next) => {
    try {
        const rel_def_reins = await prisma.reino_defensas.findMany();
        res.status(200).json(rel_def_reins); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getDefensaReinoById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rel_def_rein = await prisma.reino_defensas.findUnique({
            where: {
                id_reino: parseInt(id),
                id_defensa: parseInt(id)
            },
        });
        if (!rel_def_rein) {
            throw new Error('Not Found');
        }
        res.status(200).json(rel_def_rein); //OK
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

const updateDefensaReino = async (req, res, next) => {
    const { id } = req.params;
    const { id_reino, id_defensa } = req.body;
    try {
        const updatedRelDefRein = await prisma.reino_defensas.update({
            where: {
                id_reino: parseInt(id),
                id_defensa: parseInt(id)
            },
            data: {
                id_reino,
                id_defensa
            }
        })
        res.status(200).json(updatedRelDefRein); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const deleteDefensaReino = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedRelDefRein = await prisma.reino_defensas.delete({
            where: {
                id_reino: parseInt(id),
                id_defensa: parseInt(id)
            },
        })
        res.status(200).json(deletedRelDefRein); //OK
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


const DefensaReinoController = {
    createDefensaReino,
    getDefensaReino,
    getDefensaReinoById,
    updateDefensaReino,
    deleteDefensaReino
}

export default DefensaReinoController;