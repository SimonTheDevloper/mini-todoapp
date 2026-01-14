const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    const userId = req.userId;
    try {
        const allTodos = await Task.find({ userId }); // alle Todos zu einem User finden
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
exports.getTaskBySearch = async (req, res) => {
    try {
        let filter = {};
        let tagsArray;
        if (req.query.priority) { // noch prioity suchen. zB.: "High"
            filter.priority = req.query.priority;
        }
        if (req.query.tags) { // sucht nach tags

            tagsArray = req.query.tags.split(',');
        }
        filter.tags = { $in: tagsArray };

        if (req.query.completed) {
            filter.completed = req.query.completed;
        }
        const results = await Task.find(filter).sort({ date: -1 });;
        res.json(results);
    } catch (err) {
        res.status(500).json({ msg: err.message });

    }
};
exports.createTask = async (req, res) => {
    const { text, tags, priority } = req.body;
    const userId = req.userId;

    // Prüfen ob text da ist und nicht nur Leerzeichen ist
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    }
    try {
        const NewTodo = await Task.create({
            text: text.trim(),
            tags: tags || [],  // Falls nicht angegeben: leeres Array
            priority: priority || 'Low',  // Falls nicht angegeben: Standard
            userId: userId // die userId aus der middleware
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
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task nicht gefunden" });
        }
        if (task.userId.toString() !== req.userId) { //in der Datenbank kein einfacher String ist, sondern ein BSON-Objekt ====> DESHALB toSring
            return res.status(403).json({ error: "Du darfst diesen Task nicht löschen" });
        }
        const deltedTodo = await Task.findByIdAndDelete(id);
        res.status(200).json({ msg: "erfolgreich gelöscht", deltedTodo });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { text, } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Das Feld text darf nicht leer sein' });
    }
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task nicht gefunden" });
        }
        if (task.userId.toString() !== req.userId) { //in der Datenbank kein einfacher String ist, sondern ein BSON-Objekt ====> DESHALB toSring
            return res.status(403).json({ error: "Du darfst diesen Task nicht löschen" });
        }
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
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: "Task nicht gefunden" });
        }
        if (task.userId.toString() !== req.userId) { //in der Datenbank kein einfacher String ist, sondern ein BSON-Objekt ====> DESHALB toSring
            return res.status(403).json({ error: "Du darfst diesen Task nicht löschen" });
        }
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