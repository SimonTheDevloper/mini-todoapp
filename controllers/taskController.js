const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
    try {
        const allTodos = await Task.find(); // alle User
        res.status(200).json(allTodos);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasksById = async (req, res) => { // ein todo per id finden
    const id = req.params.id;
    try {
        const serchedTodo = await Task.findById(id);
        if (!serchedTodo) { // wenn id nicht in den Todos gibt bzw wenn todo null ist
            return res.status(404).json({ error: "Todo nicht gefunden" });
        }
        res.status(200).json({ msg: "erfolgreich gefunden", serchedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    const { text, tags, priority } = req.body;

    // Prüfen ob text da ist und nicht nur Leerzeichen ist
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    }
    try {
        const NewTodo = await Task.create({
            text: text.trim(),
            tags: tags || [],  // Falls nicht angegeben: leeres Array
            priority: priority || 'Low'  // Falls nicht angegeben: Standard
        })
        res.status(201).json({ msg: "Neue Todo erstellt", NewTodo })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.delteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const delteTodo = await Task.findByIdAndDelete(id);
        if (!delteTodo) { // wenn id nicht in den Todos gibt bzw wenn todo null ist
            return res.status(404).json({ error: "Todo nicht gefunden" });
        }
        res.status(200).json({ msg: "erfolgreich gelöscht", delteTodo });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    }
    try {
        const updatedTodo = await Task.findByIdAndUpdate(id, { text: text.trim() }, { new: true }); // new true damit die aktualisierte version zurückgegeben wird;
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo nicht gefunden" });
        }
        res.status(200).json({ msg: "Todo erfolgreich aktualisiert", updatedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.patchTask = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    //    return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    //}
    try {
        const updatedTodo = await Task.findByIdAndUpdate(id, updates, { new: true }); // new true damit die aktualisierte version zurückgegeben wird;
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo nicht gefunden" });
        }
        res.status(200).json({ msg: "Todo erfolgreich aktualisiert", updatedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};