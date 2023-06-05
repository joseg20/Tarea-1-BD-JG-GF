import prisma from '../prismaClient.js';

//pk: id Integer
//defensa VARCHAR(45) NOT NULL

const createDefensa = async (req, res, next) => {
    const { defensa } = req.body;
    try {
        if (!defensa) {
            throw new Error('Bad request');
        }
        const newDefensa = await prisma.defensas.create({
            data: {
                defensa
            },
        })
        res.status(200).json(newDefensa);  //OK
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

const getDefensas = async (req, res, next) => {
    try {
        const defensas = await prisma.defensas.findMany();
        res.status(200).json(defensas); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getDefensaById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const defensa = await prisma.defensas.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!defensa) {
            throw new Error('Not Found');
        }
        res.status(200).json(defensa); //OK
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

const updateDefensa = async (req, res, next) => {
    const { id } = req.params;
    const { defensa } = req.body;
    try {
        const updatedDefensa = await prisma.defensas.update({
            where: {
                id: parseInt(id),
            },
            data: {
                defensa
            },
        });
        res.status(200).json(updatedDefensa); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const deleteDefensa = async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.defensas.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({}); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const DefensasController = {
    createDefensa,
    getDefensas,
    getDefensaById,
    updateDefensa,
    deleteDefensa
}

export default DefensasController;


