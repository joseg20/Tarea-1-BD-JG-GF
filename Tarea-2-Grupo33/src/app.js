import express from 'express';
import UsersController from './controllers/UsersController.js';
import PersonajesController from './controllers/PersonajesController.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

// Personajes CRUD routes
app.post('/api/personajes', PersonajesController.createPersonaje);
app.get('/api/personajes', PersonajesController.getPersonajes);
app.get('/api/personajes/:id', PersonajesController.getPersonajeById);
app.put('/api/personajes/:id', PersonajesController.updatePersonaje);
app.delete('/api/personajes/:id', PersonajesController.deletePersonaje);

//endpoints(Routes)

app.get('/top5personajesConMasFuerza', UsersController.getTop5PersonajesConMasFuerza);
app.get('/personajeConMasKarts', UsersController.getPersonajeConMasKarts);
app.get('/cantidadHabitantes/:id', UsersController.getCantidadHabitantes);
app.get('/gobernante/:id?', UsersController.getGobernante);



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
        default:
            res.status(500).json({ message: 'An unknown error occurred!' });
            break;
    }
});

// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found Crack!' });
})


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})