const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/user')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler'); // middleware/errorHandler.js exportiert ein Objekt { errorHandler } darum in {}
const { generalLimiter } = require('./middleware/rateLimiter');

app.use(cors());
app.set('trust proxy', 1); // damit proxy auch funktoniert für Render 
app.use(express.json()); // damit req.body funktioniert
connectDB();

app.use(generalLimiter);
// Importiert die Routen für Todos     
//Hier sagen wir: Alle Routen aus der Datei todoRoutes fangen mit '/todos' an.                    
app.use('/todos', todoRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
