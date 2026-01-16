const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/user')
const connectDB = require('./config/db')

app.use(express.json()); // damit req.body funktioniert

connectDB();

// Importiert die Routen für Todos     
//Hier sagen wir: Alle Routen aus der Datei todoRoutes fangen mit '/todos' an.                    
app.use('/todos', todoRoutes);
app.use('/user', userRoutes)
app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
