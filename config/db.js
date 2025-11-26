const mongoose = require('mongoose');
require('dotenv').config({ silent: true });

const connectionString = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(connectionString);
        console.log('MongoDB Atlas Verbindung hergestellt!');
    } catch (err) {
        console.error('Fehler beim Verbinden mit MongoDB:', err.message);
        process.exit(1);
    }
}

//Funktion, damit wir sie in server.js nutzen können
module.exports = connectDB;