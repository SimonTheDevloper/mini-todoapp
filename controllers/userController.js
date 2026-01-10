const USER = require('../models/user');
const bcrypt = require('bcrypt')
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await USER.create({
            username: username.trim(),
            email: email.trim(),
            password: password
        })
        res.status(201).json({ msg: "Neuer User erfolgreich erstellt" })
    } catch (err) {

    }
}

exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).send("Kein User mit dieser E-Mail gefunden");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Not Allowed");
        }
        return res.status(200).send("Success");

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

