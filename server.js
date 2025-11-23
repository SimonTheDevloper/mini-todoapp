const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config({ silent: true });
app.use(express.json()); // damit req.body funktioniert

const connectionString = process.env.MONGODB_URI
async function connectDB() {
    try {
        await mongoose.connect(connectionString);
        console.log('MongoDB Atlas Verbindung hergestellt!');


    } catch (err) {
        console.error('Fehler beim Verbinden mit MongoDB:', err.message);
        process.exit(1);
    }
}
connectDB();

const Task = require('./models/task');
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await Task.find(); // alle User
        res.status(200).json(allTodos);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/todos', async (req, res) => {
    const { text } = req.body;

    // Prüfen ob text da ist und nicht nur Leerzeichen ist
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    }
    try {
        const NewTodo = await Task.create({ text: text.trim() })
        res.status(201).json({ msg: "Neue Todo erstellt", NewTodo })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});