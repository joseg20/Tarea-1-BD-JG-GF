import prisma from "../prismaClient.js";

const createReino = async (req, res, next) => {
    const { nombre, ubicacion,superficie } = req.body;
    try {
        if (!nombre || !ubicacion || !superficie) {
            throw new Error("Bad request");
        }
        const newReino = await prisma.reinos.create({
            data: {
                nombre,
                ubicacion,
                superficie
            },
        });
        res.status(200).json(newReino); //OK
    } catch (error) {
        if (error.message === "Bad request") {
            error.status = 400;
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const getReinos = async (req, res, next) => {
    try {
        const reinos = await prisma.reinos.findMany();
        res.status(200).json(reinos); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getReinoById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const reino = await prisma.reinos.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!reino) {
            throw new Error("Reino not found");
        }
        res.status(200).json(reino); //OK
    } catch (error) {
        if (error.message === "Reino not found") {
            error.status = 404;
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const updateReino = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, ubicacion, superficie } = req.body;
    try {
        if (!nombre || !ubicacion || !superficie) {
            throw new Error("Bad request");
        }
        const updatedReino = await prisma.reinos.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nombre,
                ubicacion,
                superficie
            },
        });
        res.status(200).json(updatedReino); //OK
    } catch (error) {
        if (error.message === "Bad request") {
            error.status = 400;
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}

const deleteReino = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedReino = await prisma.reinos.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(deletedReino); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const ReinosController = {
    createReino,
    getReinos,
    getReinoById,
    updateReino,
    deleteReino,
}

export default ReinosController;