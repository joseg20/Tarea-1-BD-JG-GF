import prisma from '../prismaClient.js';

const createKart = async (req, res, next) => {
    const { modelo,color,velocidad_maxima, id_personaje } = req.body;
    try {
        if (!modelo || !color ) {
            throw new Error('Bad request');
        }
        const newKart = await prisma.karts.create({
            data: {
                modelo,
                color,
                velocidad_maxima,
                id_personaje
            },
        })
        res.status(200).json(newKart);  //OK
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

const getKarts = async (req, res, next) => {
    try {
        const karts = await prisma.karts.findMany();
        res.status(200).json(karts); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}

const getKartById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const kart = await prisma.karts.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!kart) {
            throw new Error('Not Found');
        }
        res.status(200).json(kart); //OK
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

const updateKart = async (req, res, next) => {
    const { id } = req.params;
    let { modelo, color, velocidad_maxima, id_personaje } = req.body;
    try {
        let data = {};

        if(modelo) data.modelo = modelo;
        if(color) data.color = color;
        if(velocidad_maxima) data.velocidad_maxima = velocidad_maxima;
        if(id_personaje) data.id_personaje = id_personaje;


        const updatedKart = await prisma.karts.update({
            where: {
                id: parseInt(id),
            },
            data: data
        });

        res.status(200).json(updatedKart);
    } catch (err) {
        if (err.code === 'P2025') {
            err.status = 404;
            err.message = 'Not Found';
        } else {
            err.status = 500;
        }
        next(err);
    }
}


const deleteKart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedKart = await prisma.karts.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(deletedKart); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);

    }
}

const KartsController = {
    createKart,
    getKarts,
    getKartById,
    updateKart,
    deleteKart
}

export default KartsController;

