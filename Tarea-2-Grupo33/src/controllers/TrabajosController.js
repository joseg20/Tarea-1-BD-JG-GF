import prisma from '../prismaClient.js'

const createTrabajo = async (req, res,next) => {
    const { descripcion, sueldo} = req.body;
    try {
        if (!descripcion || !sueldo) {
            throw new Error('Bad request');
        }
        const newTrabajo = await prisma.trabajos.create({
            data: {
                descripcion,
                sueldo
            }
        })
        res.status(200).json(newTrabajo);
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

const getTrabajos = async (req, res,next) => {
    try {
        const trabajos = await prisma.trabajos.findMany();
        res.status(200).json(trabajos);
        } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getTrabajoById = async (req, res,next) => {
    const { id } = req.params;
    try {
        const trabajo = await prisma.trabajos.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!trabajo) {
            throw new Error('Not Found');
        }
        res.status(200).json(trabajo);
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

const updateTrabajo = async (req, res,next) => {
    const { id } = req.params;
    const { descripcion, sueldo } = req.body;
    try {
        const updateTrabajo = await prisma.trabajos.update({
            where: {
                id: parseInt(id),
            },
            data: {
                descripcion,
                sueldo
            },
        });
        if (!updateTrabajo) {
            throw new Error('Not Found');
        }
        res.status(200).json(updateTrabajo);
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

const deleteTrabajo = async (req, res,next) => {
    const { id } = req.params;
    try {
        const deleteTrabajo = await prisma.trabajos.delete({
            where: {
                id: parseInt(id),
            },
        });
        if (!deleteTrabajo) {
            throw new Error('Not Found');
        }
        res.status(200).json(deleteTrabajo);
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

const TrabajosController = {
    createTrabajo,
    getTrabajos,
    getTrabajoById,
    updateTrabajo,
    deleteTrabajo
}

export default TrabajosController;