import prisma from '../prismaClient.js';

const createDiplomacia = async (req, res, next) => {
    const { id_reino_1, id_reino_2, es_aliado } = req.body;
    try {
        if ((es_aliado == null) || isNaN(parseInt(id_reino_1)) || isNaN(parseInt(id_reino_2))){
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
        if (diplomacias.length === 0) {
            throw new Error('Not Found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getDiplomaciaById = async (req, res,next) => {
    const { id_reino_1, id_reino_2 } = req.params;
    if (isNaN(parseInt(id_reino_1)) || isNaN(parseInt(id_reino_2))) {
        const err = new Error('Bad Request');
        err.status = 400;
        return next(err);
    }
    try {
        const diplomacia = await prisma.diplomacias.findUnique({
            where: {
                id_reino_1_id_reino_2: {
                    id_reino_1: parseInt(id_reino_1),
                    id_reino_2: parseInt(id_reino_2)
                },
            },
        });
        if (!diplomacia) {
            throw new Error('Diplomacia not found');
        }
        res.status(200).json(diplomacia);
    } catch (err) {
        if (err.message === 'Bad Request') {
            err.status = 400;
        } else if (err.message === 'Diplomacia not found') {
            err.status = 404;
        } else {
            err.status = 500;
        }
        next(err);
    }
}


const updateDiplomacia = async (req, res, next) => {
    const { id_reino_1, id_reino_2 } = req.params;
    const { es_aliado } = req.body;

    // Convertimos los ids a números y validamos si son números
    const reino1 = Number(id_reino_1);
    const reino2 = Number(id_reino_2);

    if (!Number.isInteger(reino1) || !Number.isInteger(reino2) || typeof es_aliado !== 'boolean') {
        return next({ message: 'Bad Request', status: 400 });
    }

    try {
        // Verificamos si los reinos existen
        const [reinoExists1, reinoExists2] = await Promise.all([
            prisma.reinos.findUnique({ where: { id: reino1 } }),
            prisma.reinos.findUnique({ where: { id: reino2 } })
        ]);

        if (!reinoExists1 || !reinoExists2) {
            return next({ message: 'Reinos Not Found', status: 404 });
        }

        // Actualizamos la diplomacia
        const updatedDiplomacia = await prisma.diplomacias.update({
            where: { id_reino_1_id_reino_2: { id_reino_1: reino1, id_reino_2: reino2 } },
            data: { es_aliado }
        });

        res.status(200).json(updatedDiplomacia);
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
};


const deleteDiplomacia = async (req, res, next) => {
    const { id_reino_1, id_reino_2 } = req.params;
    if (isNaN(parseInt(id_reino_1)) || isNaN(parseInt(id_reino_2))) {
        const err = new Error('Bad Request');
        err.status = 400;
        return next(err);
    }
    try {
        const diplomacia = await prisma.diplomacias.findUnique({
            where: {
                id_reino_1_id_reino_2: {
                    id_reino_1: parseInt(id_reino_1),
                    id_reino_2: parseInt(id_reino_2),
                }
            }
        });

        if (!diplomacia) {
            throw new Error('Diplomacia not found');
        }

        await prisma.diplomacias.delete({
            where: {
                id_reino_1_id_reino_2: {
                    id_reino_1: parseInt(id_reino_1),
                    id_reino_2: parseInt(id_reino_2),
                },
            },
        });

        res.status(200).json({ message: `Diplomacia ${id_reino_1}/${id_reino_2} deleted` });
    } catch (err) {
        if (err.message === 'Bad Request') {
            err.status = 400;
        } else if (err.message === 'Diplomacia not found') {
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

