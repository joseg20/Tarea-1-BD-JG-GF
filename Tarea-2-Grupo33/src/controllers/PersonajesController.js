import prisma from '../prismaClient.js'

const createPersonaje = async (req, res, next) => {
    const { nombre, fuerza, fecha_nacimiento, objeto} = req.body;

    // Validación de datos
    if (!nombre ||
        nombre.length > 45 ||
        typeof nombre !== 'string' ||
        !Number.isInteger(fuerza) ||
        fuerza < 0 ||
        isNaN(new Date(fecha_nacimiento)) ||
        (objeto && (objeto.length > 30 || typeof objeto !== 'string'))) {
        return next({ status: 400 }); // Bad Request
    }
    
    try {
        const newPersonaje = await prisma.personajes.create({
            data: 
            {
                nombre,
                fuerza,
                fecha_nacimiento,
                objeto,
            },
        })

        res.status(200).json(newPersonaje);
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




const getPersonajes = async (req, res, next) => {
    try {
      const personajes = await prisma.personajes.findMany();
  
      res.status(200).json(personajes);
    } catch (err) {
      err.status = 500;
      next(err);
    }
  };
  

const getPersonajeById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const personaje = await prisma.personajes.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!personaje) {
        throw new Error('Not Found');
      }
  
      res.status(200).json(personaje);
    } catch (err) {
      if (err.message === 'Not Found') {
        err.status = 404;
      } else {
        err.status = 500;
      }
      next(err);
    }
  };
  

const updatePersonaje = async (req, res, next) => {
    const { id } = req.params;
    let { nombre, fuerza, fecha_nacimiento, objeto, fecha_inicio, fecha_termino,descripcion,sueldo } = req.body;
    if (!Number.isInteger(parseInt(id))) {
        return next({ status: 400 }); // Bad Request
    }
    // Validación de datos
    if (nombre.length > 45 ||
        typeof nombre !== 'string' ||
        !Number.isInteger(fuerza) ||
        fuerza < 0 ||
        isNaN(new Date(fecha_nacimiento)) ||
        objeto.length > 30 || 
        typeof objeto !== 'string'){
        return next({ status: 400 }); // Bad Request
    }
    try {
        let data = {};
        if(nombre) data.nombre = nombre;
        if(fuerza) data.fuerza = fuerza;
        if(fecha_nacimiento) data.fecha_nacimiento = fecha_nacimiento;
        if(objeto) data.objeto = objeto;

        const updatedPersonaje = await prisma.personajes.update({
            where: {
                id: parseInt(id),
            },
            data: data
        });

        res.status(200).json(updatedPersonaje);
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
const deletePersonaje = async (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
        return next({ status: 400 });}

    try {
        // Comprueba si existen relaciones antes de intentar eliminarlas
        const tieneTrabajo = await prisma.personaje_tiene_trabajo.count({
            where: { id_personaje: parseInt(id) }
        }) > 0;

        const habitaReino = await prisma.personaje_habita_reino.count({
            where: { id_personaje: parseInt(id) }
        }) > 0;

        const transacciones = [
            prisma.personajes.delete({
                where: { id: parseInt(id) },
            }),
        ];

        if (tieneTrabajo) {
            transacciones.unshift(
                prisma.personaje_tiene_trabajo.deleteMany({
                    where: { id_personaje: parseInt(id) },
                })
            );
        }

        if (habitaReino) {
            transacciones.unshift(
                prisma.personaje_habita_reino.deleteMany({
                    where: { id_personaje: parseInt(id) },
                })
            );
        }

        const deletedPersonaje = await prisma.$transaction(transacciones);

        // Si el personaje tenía un trabajo, verifica si es la última persona en ese trabajo
        if (tieneTrabajo) {
            const trabajoPersonaje = await prisma.personaje_tiene_trabajo.findMany({
                where: { id_personaje: parseInt(id) },
                select: { id_trabajo: true }
            });
            for (let trabajo of trabajoPersonaje) {
                const personasEnTrabajo = await prisma.personaje_tiene_trabajo.count({
                    where: { id_trabajo: trabajo.id_trabajo },
                });
                // Si es la última persona en el trabajo, elimina el trabajo
                if (personasEnTrabajo === 0) {
                    await prisma.trabajos.delete({ where: { id: trabajo.id_trabajo } });
                }
            }
        }

        res.status(200).json(deletedPersonaje[deletedPersonaje.length - 1]);
    } catch (err) {
        if (err.code === 'P2025') {
            err.status = 404;
            err.message = 'Not Found';
        } else {
            err.status = 500;
        }
        next(err);
    }
};


const PersonajesController = {
    createPersonaje,
    getPersonajes,
    getPersonajeById,
    updatePersonaje,
    deletePersonaje,
}

export default PersonajesController



