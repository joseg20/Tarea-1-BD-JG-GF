import prisma from "../prismaClient.js";

const createReino = async (req, res, next) => {
    const { nombre, ubicacion, superficie, id_personaje, fecha_registro, es_gobernante } = req.body;
    try {
        if (!nombre || !ubicacion || !superficie || !id_personaje || fecha_registro == null || es_gobernante == null) {
            throw new Error("Bad request");
        }
        const newReino = await prisma.reinos.create({
            data: {
                nombre,
                ubicacion,
                superficie,
                personaje_habita_reino: {
                    create: {
                        fecha_registro,
                        es_gobernante,
                        personaje: {
                            connect: {
                                id: id_personaje,
                            },
                        },
                    },
                },
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
    let { nombre, ubicacion, superficie } = req.body;
    try {
        let data = {};

        if(nombre) data.nombre = nombre;
        if(ubicacion) data.ubicacion = ubicacion;
        if(superficie) data.superficie = superficie;

        const updatedReino = await prisma.reinos.update({
            where: {
                id: parseInt(id),
            },
            data: data
        });

        res.status(200).json(updatedReino); //OK
    } catch (err) {
        if (err.code === 'P2025') { // Error de Prisma cuando no se encuentra un registro
            res.status(404).json({ error: "Reino not found" });
        } else {
            next(err);
        }
    }
}



const deleteReino = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Primero borra las relaciones en personaje_habita_reino
        await prisma.personaje_habita_reino.deleteMany({
            where: {
                id_reino: parseInt(id),
            },
        });

        // Luego borra el reino
        const deletedReino = await prisma.reinos.delete({
            where: {
                id: parseInt(id),
            },
        });
        
        res.status(200).json(deletedReino); //OK
    } catch (err) {
        if (err.code === 'P2025') { // Error de Prisma cuando no se encuentra un registro
            res.status(404).json({ error: "Reino not found" });
        } else {
            next(err);
        }
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