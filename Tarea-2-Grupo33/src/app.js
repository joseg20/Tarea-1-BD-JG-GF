import express from 'express';

import UsersController from './controllers/UsersController.js';
import PersonajesController from './controllers/PersonajesController.js';
import DiplomaciasController from './controllers/DiplomaciasController.js';
import ReinosController from './controllers/ReinosController.js';
import KartsController from './controllers/KartsController.js';
import TrabajosController from './controllers/TrabajosController.js';

import PersonajeTrabajoController from './controllers/PersonajeTrabajoController.js';
import PersonaReinoController from './controllers/PersonaReinoController.js';
import DefensaReinoController from './controllers/DefensaReinoController.js';

import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//Diplomacias CRUD routes
app.post('/api/diplomacias', DiplomaciasController.createDiplomacia);
app.get('/api/diplomacias', DiplomaciasController.getDiplomacias);
app.get('/api/diplomacias/:id', DiplomaciasController.getDiplomaciaById);
app.put('/api/diplomacias/:id', DiplomaciasController.updateDiplomacia);
app.delete('/api/diplomacias/:id', DiplomaciasController.deleteDiplomacia);

//Reinos CRUD routes
app.post('/api/reinos', ReinosController.createReino);
app.get('/api/reinos', ReinosController.getReinos);
app.get('/api/reinos/:id', ReinosController.getReinoById);
app.put('/api/reinos/:id', ReinosController.updateReino);
app.delete('/api/reinos/:id', ReinosController.deleteReino);

//Karts CRUD routes
app.post('/api/karts', KartsController.createKart);
app.get('/api/karts', KartsController.getKarts);
app.get('/api/karts/:id', KartsController.getKartById);
app.put('/api/karts/:id', KartsController.updateKart);
app.delete('/api/karts/:id', KartsController.deleteKart);

//Trabajos CRUD routes
app.post('/api/trabajos', TrabajosController.createTrabajo);
app.get('/api/trabajos', TrabajosController.getTrabajos);
app.get('/api/trabajos/:id', TrabajosController.getTrabajoById);
app.put('/api/trabajos/:id', TrabajosController.updateTrabajo);
app.delete('/api/trabajos/:id', TrabajosController.deleteTrabajo);

// Personajes CRUD routes
app.post('/api/personajes', PersonajesController.createPersonaje);
app.get('/api/personajes', PersonajesController.getPersonajes);
app.get('/api/personajes/:id', PersonajesController.getPersonajeById);
app.put('/api/personajes/:id', PersonajesController.updatePersonaje);
app.delete('/api/personajes/:id', PersonajesController.deletePersonaje);

//==========================================================//
//==========================================================//

// Relacion Personaje-Trabajo CRUD routes
app.post('/api/personajeTrabajo', PersonajeTrabajoController.createPersonajeTrabajo);
app.get('/api/personajeTrabajo', PersonajeTrabajoController.getPersonajeTrabajo);
app.get('/api/personajeTrabajo/:id_trabajo/:id_personaje', PersonajeTrabajoController.getPersonajeTrabajoById);
app.put('/api/personajeTrabajo/:id_trabajo/:id_personaje', PersonajeTrabajoController.updatePersonajeTrabajo);
app.delete('/api/personajeTrabajo/:id_trabajo/:id_personaje', PersonajeTrabajoController.deletePersonajeTrabajo);

// Relacion Persona-Reino CRUD routes
app.post('/api/personaReino', PersonaReinoController.createPersonaReino);
app.get('/api/personaReino', PersonaReinoController.getPersonaReino);
app.get('/api/personaReino/:id_personaje/:id_reino', PersonaReinoController.getPersonaReinoById);
app.put('/api/personaReino/:id_personaje/:id_reino', PersonaReinoController.updatePersonaReino);
app.delete('/api/personaReino/:id_personaje/:id_reino', PersonaReinoController.deletePersonaReino);

// Relacion Defensa-Reino CRUD routes
app.post('/api/defensaReino', DefensaReinoController.createDefensaReino);
app.get('/api/defensaReino', DefensaReinoController.getDefensaReino);
app.get('/api/defensaReino/:id', DefensaReinoController.getDefensaReinoById);
app.put('/api/defensaReino/:id', DefensaReinoController.updateDefensaReino);
app.delete('/api/defensaReino/:id', DefensaReinoController.deleteDefensaReino);

//endpoints(Routes)

app.get('/api/top5personajesConMasFuerza', UsersController.getTop5PersonajesConMasFuerza);
app.get('/api/personajeConMasKarts', UsersController.getPersonajeConMasKarts);
app.get('/api/cantidadHabitantes/:id', UsersController.getCantidadHabitantes);
app.get('/api/gobernante/:id?', UsersController.getGobernante);


//==========================================================//
//==========================================================//

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    switch (err.status) {
        case 400:
            res.status(400).json({ message: 'Bad Request' });
            break;
        case 500:
            res.status(500).json({ message: 'Internal Server Error' });
            break;
        case 404:
            res.status(404).json({ message: 'Not Found' });
            break;
        default:
            res.status(500).json({ message: 'An unknown error occurred!' });
            break;
    }
});


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})