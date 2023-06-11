import prisma from '../prismaClient.js';

//==========================================================//
//Datos importantes                                         //
//pk: id Integer                                            //
//defensa VARCHAR(45) NOT NULL                              //
//==========================================================//
//Defensas CRUD                                             //
//==========================================================//

//=============================================//
//Create Defensa                               //
//=============================================//
const createDefensa = async (req, res, next) => {
    //Parametros
    const { defensa } = req.body;
    //Validacion de parametros
    if (!defensa || defensa.length > 45){
        throw new Error('Bad request');
    }
    //Creacion
    try {
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
//=============================================//
//Get Defensas                                 //
//=============================================//
const getDefensas = async (req, res, next) => {
    //Busqueda
    try {
        const defensas = await prisma.defensas.findMany();
        // Si devuelve [] es un not found
        if (defensas.length === 0) {
            throw new Error('Not Found');
        }
        res.status(200).json(defensas); //OK
    } catch (error) {
        if (error.message === 'Not Found') {
            error.status = 404;
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error); // Le paso el error al siguiente middleware
    }
}
//=============================================//
//Get Defensa by id                            //
//=============================================//
const getDefensaById = async (req, res, next) => {
    //Parametros
    const { id } = req.params;
    //Validacion de parametros
    if (!id || isNaN(parseInt(id))) {
        return next({ message: 'Bad request', status: 400 });
    }
    //Busqueda
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
//=============================================//
//Update Defensa                               //
//=============================================//
const updateDefensa = async (req, res, next) => {
    //Parametros
    const { id } = req.params;
    const { defensa } = req.body;
    //Validacion de parametros
    if (!defensa || defensa.length > 45 || !id || isNaN(parseInt(id))){
        return next({ message: 'Bad request', status: 400 });
    } 
    //Actualizacion
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
        if (error.message === 'Bad request') { 
            error.status = 400;
        } else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}
//=============================================//
//Delete Defensa                               //
//=============================================//
const deleteDefensa = async (req, res, next) => {
    //Parametros
    const { id } = req.params;
    //Validacion de parametros
    if (!id || isNaN(parseInt(id))) {
        return next({ message: 'Bad request', status: 400 });
    }
    //Eliminacion
    try {
        // Elimina las relaciones de la defensa y la defensa
        const deletedDefensa = await prisma.$transaction([
            prisma.reino_defensas.deleteMany({
                where: {
                    id_defensa: parseInt(id),
                },
            }),
            prisma.defensas.delete({
                where: {
                    id: parseInt(id),
                },
            }),
        ]);
        
        res.status(200).json({}); //OK
    } catch (error) {
        if (error.code === 'P2025') {
            error.status = 404; // Not Found
        }
        else {
            error.status = 500; // Internal Server Error
        }
        next(error);
    }
}
//=============================================//
const DefensasController = {
    createDefensa,  // Metodo solido OK
    getDefensas,    // Metodo solido OK
    getDefensaById, // Metodo solido OK
    updateDefensa, // Metodo solido OK
    deleteDefensa // Not Found manejado pero sale un error en consola(NO SE CAE EL SV). Lo demas SOLIDO  
}
//=============================================//
export default DefensasController;


