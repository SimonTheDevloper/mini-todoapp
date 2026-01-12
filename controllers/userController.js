const USER = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        if (passwordMatch) {
            const token = jwt.sign(
                { id: user._id },          // 1. DER INHALT (Payload)
                process.env.JWT_SECRET,    // 2. DAS SIEGEL (Secret Key)
                { expiresIn: '24h' }       // 3. DAS HALTBARKEITSDATUM (Options)
            );
            res.status(200).json({ token });
        } else {
            return res.status(401).send("Not Allowed");
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

