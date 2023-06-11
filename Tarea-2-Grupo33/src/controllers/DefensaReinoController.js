import { parse } from 'dotenv';
import prisma from '../prismaClient.js';

//relacion defensa-reino
//PK, FK1: id_reino Integer
//PK, FK2: id_defensa Integer

//=============================================//
//Create Relacion Defensa-Reino                //
//=============================================//
const createDefensaReino = async (req, res, next) => {
    //Parametros
    const { id_reino, id_defensa } = req.body;

    //Validacion de parametros
    if (!id_reino || 
        !id_defensa || 
        isNaN(parseInt(id_reino)) || 
        isNaN(parseInt(id_defensa))) 
        {
        next({ message: 'Bad request', status: 400 });
    }

    //Creacion
    try {
        const newRelDefRein = await prisma.reino_defensas.create({
            data: {
                reinos: {
                    connect: {
                        id: parseInt(id_reino),
                    },
                },
                defensas: {
                    connect: {
                        id: parseInt(id_defensa),
                    },
                },
            },
        });

        res.status(200).json(newRelDefRein); //OK
    } catch (error) {
        if (error.message === 'Bad request') {
            error.status = 400;
        } else if (error.message.includes('No \'reinos\' record(s)')) {
            error.status = 404; // Not Found
        } else if (error.message.includes('No \'defensas\' record(s)')) {
            error.status = 404; // Not Found
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}
//=============================================//
//Get Relacion Defensa-Reino                   //
//=============================================//
const getDefensaReino = async (req, res, next) => {
    //Busqueda
    try {
        const rel_def_reins = await prisma.reino_defensas.findMany();
        // Si retorna [] es un not found
        if (rel_def_reins.length === 0) {
            throw new Error('Not Found');
        }
        res.status(200).json(rel_def_reins); //OK
    } catch (error) {
        if (error.message === 'Not Found') {
            error.status = 404;
        } else {
        error.status = 500; // Internal Server Error
        }
        next(error);
    }
}
//=============================================//
//Get Relacion Defensa-Reino by id             //
//=============================================//
const getDefensaReinoById = async (req, res, next) => {
    //Parametros
    const { id_defensa, id_reino } = req.params;

    //Validacion de parametros
    if (!id_reino || isNaN(parseInt(id_reino)) || !id_defensa || isNaN(parseInt(id_defensa))) {
        next({ message: 'Bad request', status: 400 });
    }

    //Busqueda
    try {
        const rel_def_rein = await prisma.reino_defensas.findUnique({
            where: {
                reinoId_defensaId: {
                    reinoId: parseInt(id_reino),
                    defensaId: parseInt(id_defensa)
                }
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


//=================================================================//
//Update Relacion Defensa-Reino                                    //
//=================================================================//
const updateDefensaReino = async (req, res, next) => {
    //Parametros
    const { id_defensa, id_reino } = req.params;
    const { new_id_reino, new_id_defensa } = req.body;
    
    //Validacion de parametros
    if (!id_reino || isNaN(parseInt(id_reino)) || !id_defensa || isNaN(parseInt(id_defensa)) || !new_id_reino || isNaN(parseInt(new_id_reino)) || !new_id_defensa || isNaN(parseInt(new_id_defensa))) {
        return next({ message: 'Bad request', status: 400 });
    }

    // Verificación de la existencia de los ids de reino y defensa.
    const reino = await prisma.reinos.findUnique({
        where: {
            id: parseInt(new_id_reino),
        },
    });

    const defensa = await prisma.defensas.findUnique({
        where: {
            id: parseInt(new_id_defensa),
        },
    });

    if (!reino || !defensa) {
        return next({ message: 'Not Found', status: 404 });
    }
    
    //Actualizacion
    try {
        const updatedRelDefRein = await prisma.reino_defensas.update({
            where: {
                reinoId_defensaId: {
                    reinoId: parseInt(id_reino),
                    defensaId: parseInt(id_defensa)
                },
            },
            data: {
                reinoId: parseInt(new_id_reino),
                defensaId: parseInt(new_id_defensa),
            },
        });

        res.status(200).json(updatedRelDefRein); //OK
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            error.status = 404; // Not Found
        }
        else {
            error.status = 500; // Internal Server Error
        }

        next(error);
    }
}




const deleteDefensaReino = async (req, res, next) => {
    //Parametros
    const { id_defensa, id_reino } = req.params;
    
    //Validacion de parametros
    if (!id_reino || isNaN(parseInt(id_reino)) || !id_defensa || isNaN(parseInt(id_defensa))) {
        next({ message: 'Bad request', status: 400 });
        return;
    }
    
    // Check if the relationship exists
    const rel_def_rein = await prisma.reino_defensas.findUnique({
        where: {
            reinoId_defensaId: {
                reinoId: parseInt(id_reino),
                defensaId: parseInt(id_defensa),
            }
        },
    });
    if (!rel_def_rein) {
        next({ message: 'Not Found', status: 404 });
        return;
    }

    //Eliminacion
    try {
        const deletedRelDefRein = await prisma.reino_defensas.delete({
            where: {
                reinoId_defensaId: {
                    reinoId: parseInt(id_reino),
                    defensaId: parseInt(id_defensa),
                }
            },
        });
        res.status(200).json(deletedRelDefRein); //OK
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
}


//=============================================//
const DefensaReinoController = {
    createDefensaReino,
    getDefensaReino,
    getDefensaReinoById,
    updateDefensaReino,
    deleteDefensaReino
}
//=============================================//

export default DefensaReinoController;

