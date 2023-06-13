import prisma from '../prismaClient.js';

//==========================================================//
//Datos importantes                                         //
//pk: id Integer                                            //
//modelo VARCHAR(45) NOT NULL                               //
//color CARCHAR(45) NOT NULL                                //
//velocidad_maxima INTEGER                                  //
//fk id_personaje INTEGER                                   //
//==========================================================//
//Karts CRUD                                                //
//==========================================================//

//=============================================//
//Create Karts                                 //
//=============================================//

const createKart = async (req, res, next) => {
    //Parametros
    const { modelo,color,velocidad_maxima, id_personaje } = req.body;
    //Validacion de parametros
    if (!modelo ||
        modelo.length > 45 ||
        typeof modelo !== 'string' ||
        !color || 
        color.length > 45 ||
        typeof color !== 'string' ||
        !Number.isInteger(velocidad_maxima) ||
        velocidad_maxima < 0 ||
        !Number.isInteger(id_personaje) ||
        id_personaje < 0){
        return next({  status: 400 });
    }
    // Verificamos existencia de id_personaje
    const personaje = await prisma.personajes.findUnique({
        where: {
            id: id_personaje
        }
    });
    if (!personaje) {
        return next({  status: 404 });
    }

    //Creacion
    try {
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
    if (!Number.isInteger(parseInt(id))) {
        return next({  status: 400 });
    }
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
    if (!Number.isInteger(parseInt(id))) {
        return next({  status: 400 });
    }
    let { modelo, color, velocidad_maxima, id_personaje } = req.body;
    //Validacion de parametros
    if ((modelo && (modelo.length > 45 || typeof modelo !== 'string')) ||
        (color && (color.length > 45 || typeof color !== 'string')) ||
        (velocidad_maxima && (!Number.isInteger(velocidad_maxima) || velocidad_maxima < 0)) ||
        (id_personaje && (!Number.isInteger(id_personaje) || id_personaje < 0))) {
        return next({  status: 400 });
    }
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
    //Validacion de parametros
    if (!Number.isInteger(parseInt(id))) {
        return next({ status: 400 });
    }
    
    try {
        // Verificamos existencia de id
        const kart = await prisma.karts.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        if (!kart) {
            return next({ status: 404 });
        }
        
        const deletedKart = await prisma.karts.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(deletedKart); //OK
    } catch (error) {
        error.status = error.status || 500; // Internal Server Error
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

