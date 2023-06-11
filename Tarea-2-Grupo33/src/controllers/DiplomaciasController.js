import prisma from '../prismaClient.js';

const createDiplomacia = async (req, res, next) => {
    const { id_reino_1, id_reino_2, es_aliado } = req.body;
    try {
        if (!es_aliado || isNaN(parseInt(id_reino_1)) || isNaN(parseInt(id_reino_2))){
            throw new Error('Bad Request');
        }

        // Checking if reinos exist
        const reino1 = await prisma.reinos.findUnique({ where: { id: parseInt(id_reino_1) } });
        const reino2 = await prisma.reinos.findUnique({ where: { id: parseInt(id_reino_2) } });
        if (!reino1 || !reino2) {
            throw new Error('Reino not found');
        }

        const diplomacia = await prisma.diplomacias.create({
            data: {
                id_reino_1,
                id_reino_2,
                es_aliado,
            },
        });
        res.status(201).json(diplomacia);
    } catch (err) {
        if (err.message === 'Bad Request') {
            err.status = 400;
        } else if (err.message === 'Reino not found') {
            err.status = 404;
        } else {
            err.status = 500;  // Internal Server Error
        }
        next(err);
    }
}

const getDiplomacias = async (req, res, next) => {
    try {
        const diplomacias = await prisma.diplomacias.findMany();
        res.status(200).json(diplomacias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDiplomaciaById = async (req, res,next) => {
    const { id } = req.params;
    try {
        const diplomacia = await prisma.diplomacias.findUnique({
        where: {
            id: parseInt(id),
        },
        });
        if (!diplomacia) {
            throw new Error('Diplomacia not found');
        }
        res.status(200).json(diplomacia);
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const updateDiplomacia = async (req, res,next) => {
    const { id } = req.params;
    const { id_reino_1, id_reino_2, es_aliado } = req.body;
    try {
        const updatedDiplomacia = await prisma.diplomacias.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id_reino_1,
            id_reino_2,
            es_aliado,
        },
        });
        if (!updatedDiplomacia) {
            throw new Error('Diplomacia not found');
        }
        res.status(200).json(updatedDiplomacia);
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const deleteDiplomacia = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.diplomacias.delete({
        where: {
            id: parseInt(id),
        },
        });
        if (!diplomacia) {
            throw new Error('Diplomacia not found');
        }
        res.status(200).json({ message: `Diplomacia ${id} deleted` });
    } catch (err) {
        if (err.message === 'Not Found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}

const DiplomaciasController = {
    createDiplomacia,
    getDiplomacias,
    getDiplomaciaById,
    updateDiplomacia,
    deleteDiplomacia
}

export default DiplomaciasController;

